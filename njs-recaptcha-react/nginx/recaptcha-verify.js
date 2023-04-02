async function reCaptchaVerify(r) {
  const token = r.headersIn['X-ReCaptcha-Token'];
  if (!token) {
    r.return(401, 'Token is required');
    return;
  }

  const reCaptchaVersion = r.variables.reCaptchaVersion;
  if (reCaptchaVersion !== 'v2' && reCaptchaVersion !== 'v3') {
    r.return(401, 'Unsupported reCAPTCHA version');
    return;
  }

  const reCaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const reCaptchaAction = process.env.RECAPTCHA_ACTION;

  if (!reCaptchaSecretKey) {
    r.return(401, 'reCAPTCHA secret key is not set');
    return;
  }

  if (reCaptchaVersion === 'v3' && !reCaptchaAction) {
    r.return(401, 'reCAPTCHA action is mandatory for v3');
    return;
  }

  const request = `secret=${reCaptchaSecretKey}&response=${token}`;
  r.warn('reCAPTCHA verification request: ' + request);

  const googleVerifyResponse = await ngx.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: request,
  });
  const body = await googleVerifyResponse.text();
  const result = JSON.parse(body);

  r.warn('reCAPTCHA verification result: ' + JSON.stringify(result));

  const success = result.success && (reCaptchaVersion === 'v2' || result.action === reCaptchaAction);
  if (!success) {
    r.return(401, 'reCAPTCHA verification failed');
    return;
  }

  r.return(200);
}

export default { reCaptchaVerify };

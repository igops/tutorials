import axios from 'axios';

export const requestUnlockPhoto = async ({ recaptchaVersion, photoId, captchaToken, onUnlock, onError }) => {
  try {
    const response = await axios.get('/unlock-photo',
      {
        params: {
          recaptcha_version: recaptchaVersion,
          id: photoId,
        },
        headers: {
          'X-ReCaptcha-Token': captchaToken,
        },
      });
    const src = await response.data;
    onUnlock(src);
  } catch (e) {
    onError(e);
  }
};

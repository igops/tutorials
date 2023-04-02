import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import ConfettiAnimation from './ConfettiAnimation';
import { getBlurredPhotoUrl, getRandomPhotoId } from './LoremIpsumPhotos';
import { requestUnlockPhoto } from './Requests';

PhotoUnlockerRCv3.propTypes = {
  reCaptchaAction: PropTypes.string.isRequired,
};

function PhotoUnlockerRCv3(props) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [photoId, setPhotoId] = useState(getRandomPhotoId());
  const [unlockedPhotoSrc, setUnlockedPhotoSrc] = useState('');
  const lockAgain = () => {
    setUnlockedPhotoSrc('');
    setPhotoId(getRandomPhotoId);
  };

  const handleReCaptchaVerify = useCallback(async (photoId, unlockedPhotoSrc) => {
    if (unlockedPhotoSrc) {
      lockAgain();
      return;
    }

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const captchaToken = await executeRecaptcha(props.reCaptchaAction);
    await requestUnlockPhoto({
      recaptchaVersion: 'v3',
      photoId,
      captchaToken,
      onUnlock: setUnlockedPhotoSrc,
      onError: (e) => { lockAgain(); console.log(e); },
    });
  }, [executeRecaptcha]);

  return (
    <>
      {unlockedPhotoSrc && <ConfettiAnimation onComplete={lockAgain} />}
      <div className='locked-photo d-flex align-items-center justify-content-center user-select-none'
           onClick={() => handleReCaptchaVerify(photoId, unlockedPhotoSrc)}
           style={{ backgroundImage: `url(${unlockedPhotoSrc || getBlurredPhotoUrl(photoId)})` }}
      >
        {unlockedPhotoSrc ? '' : 'Click to unlock!'}
      </div>
    </>
  );
}

export default PhotoUnlockerRCv3;

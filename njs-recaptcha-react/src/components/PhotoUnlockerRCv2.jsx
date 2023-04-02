import PropTypes from 'prop-types';
import { useState } from 'react';
import Reaptcha from 'reaptcha';
import ConfettiAnimation from './ConfettiAnimation';
import { getBlurredPhotoUrl, getRandomPhotoId } from './LoremIpsumPhotos';
import { requestUnlockPhoto } from './Requests';

PhotoUnlockerRCv2.propTypes = {
  reCaptchaAction: PropTypes.string.isRequired,
  reCaptchaKey: PropTypes.string.isRequired,
};

function PhotoUnlockerRCv2(props) {

  const [photoId, setPhotoId] = useState(getRandomPhotoId());
  const [unlockedPhotoSrc, setUnlockedPhotoSrc] = useState('');

  const lockAgain = () => {
    setUnlockedPhotoSrc('');
    setPhotoId(getRandomPhotoId);
  };

  const unlockPhoto = async (photoId, captchaToken) => {
    await requestUnlockPhoto({
      recaptchaVersion: 'v2',
      photoId,
      captchaToken,
      onUnlock: setUnlockedPhotoSrc,
      onError: (e) => { lockAgain(); console.log(e); },
    });
  };

  return (
    <>
      {unlockedPhotoSrc && <ConfettiAnimation onComplete={lockAgain} />}
        <div className='locked-photo d-flex align-items-center justify-content-center user-select-none'
             onClick={lockAgain}
             style={{ backgroundImage: `url(${unlockedPhotoSrc || getBlurredPhotoUrl(photoId)})` }}
        >
          {unlockedPhotoSrc ? '' :
            <Reaptcha onVerify={(captchaToken) => unlockPhoto(photoId, captchaToken)}
                      sitekey={props.reCaptchaKey} />
          }
        </div>
    </>
  );
}

export default PhotoUnlockerRCv2;

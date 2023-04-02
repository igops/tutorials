import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import PhotoUnlockerRCv2 from './components/PhotoUnlockerRCv2';
import PhotoUnlockerRCv3 from './components/PhotoUnlockerRCv3';

App.propTypes = {
  reCaptchaVersion: PropTypes.oneOf(['v2', 'v3']).isRequired,
  reCaptchaKey: PropTypes.string.isRequired,
  reCaptchaAction: PropTypes.string.isRequired,
};

function App(props) {
  return (
    <Container className='container d-flex align-items-center justify-content-center'>
      { props.reCaptchaVersion === 'v2' &&
        <PhotoUnlockerRCv2 reCaptchaAction={props.reCaptchaAction}
                           reCaptchaKey={props.reCaptchaKey} />
      }
      { props.reCaptchaVersion === 'v3' &&
        <GoogleReCaptchaProvider reCaptchaKey={props.reCaptchaKey}>
          <PhotoUnlockerRCv3 reCaptchaAction={props.reCaptchaAction} />
        </GoogleReCaptchaProvider>
      }
    </Container>
  );
}

export default App;

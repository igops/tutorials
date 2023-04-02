import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const reCaptchaVersion = process.env.REACT_APP_RECAPTCHA_VERSION;
const reCaptchaAction = process.env.REACT_APP_RECAPTCHA_ACTION;
const reCaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY;

root.render(
  <React.StrictMode>
    <App reCaptchaAction={reCaptchaAction}
         reCaptchaKey={reCaptchaKey}
         reCaptchaVersion={reCaptchaVersion} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

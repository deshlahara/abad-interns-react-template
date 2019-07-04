import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

const Spinner = ({ msg }) => {
  return (
    <div className="display-3 container-fluid">
      <style>{'body {background: #780206; background: linear-gradient(to bottom, #e0eafc, #cfdef3); }'}</style>

      <div className="container">
        <span className="text-center d-flex justify-content-center pt-5">
          <img
            alt="preloader"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif"
          />
        </span>

        <div className="text-center d-flex justify-content-center pt-5">{msg}</div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Spinner;

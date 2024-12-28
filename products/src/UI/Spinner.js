import React, { Fragment } from 'react';
import spinner from './spinner.gif';


import styles from './Spinner.module.css'; // Add this for custom styles

const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <img
      src={spinner}
      style={{ width: '200px', display: 'block', margin: '0 auto' }}
      alt="Loading..."
    />
    <p className={styles.spinnerText}>Loading... Please wait</p>
  </div>
);

export default Spinner;



// DeliveryDetails.jsx
import React from "react";
import styles from "./DeliveryDetails.module.css";

const DeliveryDetails = ({
  deliveryOption,
  setDeliveryOption,
  deliveryLocation,
  setDeliveryLocation,
}) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionHeading}>Delivery Details</h3>
      <label className={styles.label}>Select delivery option</label>
      <div className={styles.deliveryButtons}>
        <button
          className={`${styles.deliveryBtn} ${
            deliveryOption === "Delivery" ? styles.active : ""
          }`}
          onClick={() => setDeliveryOption("Delivery")}
        >
          Delivery
        </button>
        <button
          className={`${styles.deliveryBtn} ${
            deliveryOption === "Pick up" ? styles.active : ""
          }`}
          onClick={() => setDeliveryOption("Pick up")}
        >
          Pick up
        </button>
      </div>

      <div className={styles.locationCard}>
        <div className={styles.locationHeader}>Delivery location</div>
        <div className={styles.locationRow}>
          <span className={styles.locationName}>{deliveryLocation}</span>
          <button
            className={styles.changeBtn}
            onClick={() => setDeliveryLocation("New Location")}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;

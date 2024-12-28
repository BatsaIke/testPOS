import React, { useState, useRef } from "react";
import styles from "./ProductCard.module.css";
import Modal from "../../UI/modal/Modal";
import CartPage from "../cartpage/CartPage";

const LONG_PRESS_MS = 600; // Adjust how long user must press to select

const ProductCard = ({ product, onSelectChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NEW: Local state for “long-press” selection highlight
  const [isSelected, setIsSelected] = useState(false);
  const pressTimerRef = useRef(null);

  const handleClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // NEW: Start the press timer on mouse/touch down
  const handlePressStart = () => {
    pressTimerRef.current = setTimeout(() => {
      // Toggle selection
      setIsSelected((prev) => {
        const newVal = !prev;
        // If parent gave a callback, let them know
        if (onSelectChange) {
          onSelectChange(product, newVal);
        }
        return newVal;
      });
    }, LONG_PRESS_MS);
  };

  // NEW: Clear the timer if user releases early (no long press)
  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const rating = (product.averageRating || 0).toFixed(1);
  const minPrice =
    Math.min(...(product.variants || []).map((v) => v.price)) || 0;

  return (
    <>
      {/* 
        Existing Code: 
        We attach onClick to open the modal, 
        plus new “long press” events for highlight. 
      */}
      <div
        className={`${styles.productCard} ${isSelected ? styles.selected : ""}`}
        onClick={handleClick}
        // NEW: Long press events (mouse)
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        // NEW: Long press events (touch)
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        {/* Image */}
        <div className={styles.imageContainer}>
          <img
            src={product.image?.url}
            alt={product.name}
            className={styles.productImage}
          />
        </div>

        {/* Info under the image */}
        <div className={styles.infoSection}>
          {/* First row: name on left, star rating on right */}
          <div className={styles.topRow}>
            <h3 className={styles.productName}>{product.name}</h3>
            <div className={styles.productRating}>
              <span className={styles.starIcon}>★</span>
              <span>{rating}</span>
            </div>
          </div>
          {/* Second row: Price, directly below name */}
          <p className={styles.productPrice}>GHS {minPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Existing: Modal for “Add to Cart” details */}
      <Modal isOpen={isModalOpen} onClose={closeModal} header="Add to Cart">
        <CartPage product={product} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default ProductCard;

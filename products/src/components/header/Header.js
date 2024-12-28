import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBell,
  faChevronDown,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

import CheckoutPage from "../checkout/Checkoutpage";
import Modal from "../../UI/modal/Modal";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity) || 0;
  const user = useSelector((state) => state.auth.user); // Fetch logged-in user details
  const navigate = useNavigate();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility

  const handleCartClick = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logo}>Syst</div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <button className={styles.cartButton} onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
            <span className={styles.cartQty}>{cartQuantity}</span>
          </button>

          <FontAwesomeIcon icon={faBell} className={styles.bellIcon} />

          <div className={styles.userSection}>
            {/* Dynamically display avatar or fallback icon */}
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className={styles.userAvatar}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                className={styles.defaultAvatarIcon}
              />
            )}
            <FontAwesomeIcon icon={faChevronDown} className={styles.arrowIcon} />
          </div>

          {/* Mobile Menu Icon */}
          <FontAwesomeIcon
            icon={faBars}
            className={styles.mobileMenuIcon}
            onClick={toggleMobileMenu}
          />
        </div>
      </header>

      {/* Modal for Checkout */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        header="Payment"
        className={styles.productsModal}
      >
        <CheckoutPage onClose={handleCloseCheckout} />
      </Modal>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default Header;

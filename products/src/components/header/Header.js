import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
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
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleCartClick = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Syst</div>

        <div className={styles.searchWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.rightSection}>
          <button className={styles.cartButton} onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
            <span className={styles.cartQty}>{cartQuantity}</span>
          </button>

          <FontAwesomeIcon icon={faBell} className={styles.bellIcon} />

          <div
            className={styles.userSection}
            ref={dropdownRef}
            onClick={toggleDropdown}
          >
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
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          <FontAwesomeIcon
            icon={faBars}
            className={styles.mobileMenuIcon}
            onClick={toggleMobileMenu}
          />
        </div>
      </header>

      <Modal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        header="Payment"
        className={styles.productsModal}
      >
        <CheckoutPage onClose={handleCloseCheckout} />
      </Modal>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default Header;

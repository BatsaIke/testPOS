import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faShoppingCart, faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.menuList}>
        {/* Home */}
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            isActive
              ? `${styles.menuItem} ${styles.activeMenuItem}`
              : styles.menuItem
          }
        >
          <FontAwesomeIcon icon={faHome} className={styles.menuIcon} />
          Home
        </NavLink>

        {/* Products */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? `${styles.menuItem} ${styles.activeMenuItem}`
              : styles.menuItem
          }
        >
          <FontAwesomeIcon icon={faBox} className={styles.menuIcon} />
          Products
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? `${styles.menuItem} ${styles.activeMenuItem}`
              : styles.menuItem
          }
        >
          <FontAwesomeIcon icon={faShoppingCart} className={styles.menuIcon} />
          Orders
        </NavLink>

        {/* Report */}
        <NavLink
          to="/admin/report"
          className={({ isActive }) =>
            isActive
              ? `${styles.menuItem} ${styles.activeMenuItem}`
              : styles.menuItem
          }
        >
          <FontAwesomeIcon icon={faChartBar} className={styles.menuIcon} />
          Report
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

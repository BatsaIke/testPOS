import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Homepage from "./components/home/Homepage.js";
import LoginPage from "./pages/Login/Loginpage";
import Alert from "./UI/alert/Alert";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { getLoginUser } from "./actions/authAction";
import SignupPage from "./pages/signup/SignupPage";
import AdminLayout from "./admin/AdminLayout";
import AddProductForm from "./admin/AddProduct/AddProducts";
import Products from "./admin/products-table/ProductsComponent";
import PrivateRoute from "./components/PrivateRoute";
import '@fortawesome/fontawesome-free/css/all.min.css';
import OrdersPage from "./admin/orders/order-details/OrderPage.js";
import ReportsPage from "./admin/reports/ReportsPage.js";
import Header from "./components/header/Header.js";

function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // Set auth token header auth
      dispatch(getLoginUser());
    }
  }, [dispatch]);

  // Check if the current route is login or signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {/* Render Header only if not on login or signup */}
      {!isAuthPage && <Header />}
      <Alert />
      <div className="container">
        <Routes>
          {/* Redirect from / to /admin/home */}
          <Route path="/" element={<Navigate to="/admin/home" />} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route element={<PrivateRoute />}>
              <Route path="addproducts" element={<AddProductForm />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="report" element={<ReportsPage />} />
              <Route path="home" element={<Homepage />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

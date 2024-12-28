import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaymentDetails from "./PaymentDetails";
import DeliveryDetails from "./DeliveryDetails";
import styles from "./CheckoutPage.module.css";
import { createOrder } from "../../actions/orderActions";
import { clearCart } from "../../redux/slices/cartSlice";

const CheckoutPage = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // Form states
  const [name, setName] = useState("Kwame Dartey");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+233");
  const [phoneNumber, setPhoneNumber] = useState("278 811 107");
  const [paymentMethod, setPaymentMethod] = useState("Momo");
  const [momoSameAsPhone, setMomoSameAsPhone] = useState(false);
  const [momoPhoneNumber, setMomoPhoneNumber] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Delivery");
  const [deliveryLocation, setDeliveryLocation] = useState("Circle");
  const [error, setError] = useState("");

  // If cart is empty, render a fallback message
  if (cartItems.length === 0) {
    return (
      <div className={styles.errorMessage}>
        Your cart is empty. Please add items to proceed.
      </div>
    );
  }

  const validate = () => {
    if (!name.trim() || !phoneNumber.trim()) {
      setError("Name and phone number are required.");
      return false;
    }
    return true;
  };

  const handleContinueToPay = async () => {
    setError("");
    if (!validate()) return;

    const orderData = {
      customerName: name,
      phone: phoneCountryCode + " " + phoneNumber,
      paymentMethod,
      momoNumber: momoSameAsPhone
        ? phoneCountryCode + " " + phoneNumber
        : phoneCountryCode + " " + momoPhoneNumber,
      deliveryOption,
      deliveryLocation,
      totalAmount: totalPrice,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };

    const result = await dispatch(createOrder(orderData));

    if (result.success) {
      console.log("Order created successfully: ", result.order);

      // Clear the cart on successful order creation
      dispatch(clearCart());

      if (onClose) onClose();
    } else {
      setError(result.message || "Could not create order.");
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <PaymentDetails
        name={name}
        setName={setName}
        phoneCountryCode={phoneCountryCode}
        setPhoneCountryCode={setPhoneCountryCode}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        momoSameAsPhone={momoSameAsPhone}
        setMomoSameAsPhone={setMomoSameAsPhone}
        momoPhoneNumber={momoPhoneNumber}
        setMomoPhoneNumber={setMomoPhoneNumber}
      />

      <DeliveryDetails
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption}
        deliveryLocation={deliveryLocation}
        setDeliveryLocation={setDeliveryLocation}
      />

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.bottomBar}>
        <button className={styles.payButton} onClick={handleContinueToPay}>
          Continue to Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

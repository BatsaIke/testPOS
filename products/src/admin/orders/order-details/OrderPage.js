import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OrdersPage.module.css";
import { fetchOrders, updateOrderStatus } from "../../../actions/orderActions";
import Spinner from "../../../UI/Spinner"; // Import Spinner

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus(orderId, newStatus));
  };

  if (loading) {
    return <Spinner />; // Use the updated Spinner component
  }

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.ordersPage}>
        <h2 className={styles.header}>Orders</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Products</th>
                <th>Price</th>
                <th>Delivery</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* Customer */}
                  <td>{order.items?.[0]?.product?.name || "No Customer Data"}</td>

                  {/* Products */}
                  <td>
                    {order.items && order.items.length > 0
                      ? order.items
                          .map((item) => {
                            const variantName = item.product?.variants?.find(
                              (variant) =>
                                item.product.variants.indexOf(variant) ===
                                order.items.indexOf(item)
                            )?.name;
                            return variantName || "Variant Missing";
                          })
                          .join(", ")
                      : "No Products"}
                  </td>

                  {/* Total Price */}
                  <td>{order.totalAmount || "N/A"}</td>

                  {/* Delivery */}
                  <td>
                    {order.deliveryLocation
                      ? "Delivery"
                      : order.deliveryOption || "Pick up"}
                  </td>

                  {/* Date */}
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Unknown Date"}
                  </td>

                  {/* Status */}
                  <td>
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`${styles.statusSelect} ${
                        styles[order.status?.toLowerCase() || "pending"]
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

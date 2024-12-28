import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Products.module.css";
import { fetchProducts, deleteAProduct } from "../../actions/productActions";
import ProductsTable from "./ProductsTable";
import Spinner from "../../UI/Spinner";

function Products() {
  const dispatch = useDispatch();
  const { products: nestedProducts, loading } = useSelector(
    (state) => state.product
  );
  const products = nestedProducts.products || [];

  useEffect(() => {
    // Load all products on mount
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (productId) => {
    await dispatch(deleteAProduct(productId));
    // optionally re-fetch or remove from local state
    dispatch(fetchProducts());
  };

  if (loading) {
    return <Spinner />;
  }

  // For demonstration, no search bar or "add" button—matching the screenshot

  return (
    <div className={styles.productsContainer}>
      {/* Page Header */}
      <h2 className={styles.pageTitle}>Product History</h2>

      {/* Products Table */}
      {products.length > 0 ? (
        <ProductsTable products={products} onDelete={handleDelete} />
      ) : (
        <p className={styles.noProducts}>No products yet!</p>
      )}

      {/* Pagination row (placeholder). Hook up logic as needed. */}
      <div className={styles.pagination}>
        <button className={styles.pageBtnActive}>1</button>
        <button className={styles.pageBtn}>2</button>
        <button className={styles.pageBtn}>3</button>
        <button className={styles.pageBtn}>4</button>
      </div>
    </div>
  );
}

export default Products;

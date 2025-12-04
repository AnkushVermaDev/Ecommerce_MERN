import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "../Css/home.module.css";
import popupsound from "../Media/Sounds/popup.mp3";
import successpayment from '../Media/Sounds/Successpayment.mp3';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [open,setOpen]=useState(false);

  const ip = process.env.REACT_APP_IP;

  const handlebuynow = () => {
    new Audio(successpayment).play();
  };

  const addtocart = async (item) => {
    new Audio(popupsound).play();

    try {
      const res = await fetch(`${ip}/api/cart/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item._id,
          ...item,
        }),
      });

      if (!res.ok) {
        console.error('Failed to add item to cart');
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  // -----------------------------
  // FIXED: Only fetch when ID changes
  // Skip fetch if product provided via navigation
  // -----------------------------
  useEffect(() => {
    if (product) return; 

    const fetchProductById = async () => {
      try {
        const res = await fetch(`${ip}/api/products/${id}`);
        const data = await res.json();

        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]); // ONLY id here

  // -----------------------------
  // Loading state
  // -----------------------------
  if (loading) {
    return (
      <div className="bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">
        <h3>Loading product...</h3>
      </div>
    );
  }

  // -----------------------------
  // Product not found
  // -----------------------------
  if (!product) {
    return (
      <div className="bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">
        <h3>Product not found.</h3>
      </div>
    );
  }

  // -----------------------------
  // UI Rendering
  // -----------------------------
  return (
    <div className={`${styles.productdetailpage} d-flex flex-column gap-5`}>

      {/* ----------------------- Image Gallery ----------------------- */}
      <div
        className="p-4 rounded"
        style={{ background: "#111", border: "1px solid #222" }}
      >
        <div
          className="w-full rounded overflow-hidden relative d-flex items-center justify-center bg-gray-900 border"
          style={{ height: "350px" }}
        >
          <i className="bi bi-arrow-left text-white absolute left-3 fs-1"></i>

          <div className="child-img w-[49%] md:w-[45%] lg:w-[25%] h-full bg-red-500">

            <img
              src={product.url}
              alt={product.name}
              style={{ objectFit: "cover", width: "100%", height: "100%" }
            }
            />
          </div>

          <i className="bi bi-arrow-right text-white absolute right-3 fs-1"></i>
        </div>

        {/* Thumbnails */}
        <div className="d-flex gap-3 mt-4 flex-wrap d-flex items-center justify-center">
          {[product.url, product.url, product.url].map((src, idx) => (
            <div
              key={idx}
              className="rounded"
              style={{
                width: 75,
                height: 75,
                background: "#000",
                overflow: "hidden",
                border: "1px solid #333",
                cursor: "pointer",
              }}
            >
              <img
                src={src}
                alt="thumb"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ----------------------- Product Info ----------------------- */}
      <div className="ms-4 text-white">
        <h2 className="fw-bold">{product.name}</h2>

        <div className="d-flex align-items-center mt-2">
          <span
            className={`${styles.rating} me-2`}
            style={{ padding: "4px 10px", borderRadius: "6px" }}
          >
            ⭐ {product.rating}
          </span>
          <span className="text-gray-500 small">12,345 ratings • 500+ reviews</span>
        </div>

        <hr className="border-secondary" />

        {/* Price */}
        <div className="mt-3">
          <h2 className="fw-bold text-success mb-1">${product.price}</h2>
          <p className="text-danger text-decoration-line-through small mb-0">
            MRP: ${product.price + 50}
          </p>
          <p className="text-success small">You save $50 (inclusive of all taxes)</p>
        </div>
      </div>

      {/* ----------------------- Buy Box ----------------------- */}
      <div
        className="p-4 rounded shadow-sm text-gray-300"
        style={{ background: "#111", border: "1px solid #222" }}
      >
        <h4 className="text-success fw-bold mb-3">${product.price}</h4>

        <button className="btn btn-warning w-100 fw-bold mb-3"
          onClick={handlebuynow}>
          Buy Now
        </button>

        <button className="btn btn-primary w-100 fw-bold mb-3"
          onClick={() => addtocart(product)}>
          Add to Cart
        </button>

        <p className="mt-3 text-gray-400 small">Delivering in 3–5 days</p>
        <p className="text-gray-400 small">Secure Payments • Free Returns</p>

        <div className="description w-full">
          <hr className="mt-5" />
          <h3 className="pt-15 text-white">Description</h3>

          <h5 className="text-gray-400 font-light mt-5">
            {product.description.substring(0, 50)}...
          </h5>

          <button
            className="moredetail w-full flex items-center justify-center mt-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            <i
              className={`bi fs-2 text-warning ${open ? "bi-chevron-double-up" : "bi-chevron-double-down animate-bounce"
                }`}
            ></i>
          </button>

          {open && (
            <div className="detail mt-3">
              <h5 className="fs-6 font-light text-gray-200">{product.description}</h5>

              {/* Highlights */}
              <div className="mt-4">
                <h5 className="fw-bold text-white">Highlights</h5>
                <ul className="text-gray-200 mt-2">
                  <li>Premium Build Quality</li>
                  <li>Fast Delivery</li>
                  <li>1 Year Warranty</li>
                  <li>10 Day Replacement Policy</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

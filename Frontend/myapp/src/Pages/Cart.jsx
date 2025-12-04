import React, { useState, useEffect } from "react";
import popupsound from '../Media/Sounds/popup.mp3';
import successpayment from '../Media/Sounds/Successpayment.mp3';
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
    const ip = process.env.REACT_APP_IP;


  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${ip}/api/cart`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          setCart([]); // fallback empty cart
          return;
        }

        const data = await res.json();
        setCart(data || []); // API returns array of cart items
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  // Increase quantity
  const increaseQty = async (item) => {
  try {
    const newQty = item.quantity + 1;

    await fetch(`${ip}/api/cart/${item.product._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    // Update UI
    setCart(prev =>
      prev.map(i =>
        i.product._id === item.product._id
          ? { ...i, quantity: newQty }
          : i
      )
    );
  } catch (err) {
    console.error(err);
  }
};


  // Decrease quantity
  const decreaseQty = async (item) => {
  if (item.quantity <= 1) return; // prevent going below 1

  try {
    const newQty = item.quantity - 1;

    await fetch(`${ip}/api/cart/${item.product._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    // Update UI
    setCart(prev =>
      prev.map(i =>
        i.product._id === item.product._id
          ? { ...i, quantity: newQty }
          : i
      )
    );
  } catch (err) {
    console.error(err);
  }
};


  // Remove item
  const removeItem = async (id) => {
    try {
      const res = await fetch(`${ip}/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Update UI without refresh
        setCart(prev => prev.filter(item => item.product._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };


  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleBuyNow = async () => {
    if (cart.length === 0) return;

    new Audio(successpayment).play();

    // Wait for all DELETE API calls to finish
    await Promise.all(
      cart.map(item =>
        removeItem(item.product._id)
      )
    );

    // Clear UI after server-side deletion completes
    setCart([]);
  };


  return (
    <div className="bg-black text-white min-vh-100 py-4">
      <h2 className="fw-bold pb-3 ps-4 border-b-1">Cart</h2>
      <div className="container-fluid">
        <div className="row g-4">
          {/* LEFT: Cart Items */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 d-flex gap-3 rounded h-110 md:h-95 flex-col md:flex-row items-center"
                    style={{ background: "#111", border: "1px solid #222" }}
                  >
                    <div className="imgbox" style={{ width: '220px', height: '220px', borderRadius: "8px" }}>
                      <img
                        className="w-full h-full"
                        src={item.product.url}
                        alt={item.product.name}
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fs-3 fw-bold">{item.product.name}</h5>
                      <p className="fs-4 text-success fw-bold mb-1">${item.product.price}</p>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-secondary p-2 px-3"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary p-2 px-3"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-sm btn-danger mt-2 w-full h-12 mt-3"
                        onClick={() => {
                          removeItem(item.product._id); console.log(JSON.stringify(item));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h4 className="text-center mt-4 text-white">Your cart is empty.</h4>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="col-lg-4">
            <div className="p-4 rounded lg:h-95" style={{ background: "#111" }}>
              <h4 className="fw-bold mb-3">Order Summary</h4>
              <div className="d-flex justify-content-between">
                <span className="text-gray-400">Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-gray-400">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr className="border-secondary" />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
              <button
                className="btn btn-warning fw-bold w-100 mt-3"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

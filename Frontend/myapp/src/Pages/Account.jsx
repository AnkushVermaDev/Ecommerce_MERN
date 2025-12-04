import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/account.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ip = process.env.REACT_APP_IP;

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return navigate("/login");

      const res = await fetch(`${ip}/api/users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error loading user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) return <div className="account-loading">Loading account...</div>;
  if (!user) return <div className="account-loading">Unable to load user details.</div>;

  const firstLetter = user.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="account-container">
      {/* Profile */}
      <div className="profile-section">
        <div className="avatar">{firstLetter}</div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
      </div>

      <hr className="divider" />

      

      <h3 className="section-title">Your Activity</h3>

      <div className="activity-row">
        <Link to="/cart" className="activity-card">
          <div>
            <span className="card-label">Cart Items</span>
            <span className="card-value">{user.cart?.length || 0}</span>
          </div>
          <span className="card-arrow">{">"}</span>
        </Link>

        <Link to="/cart" className="activity-card">
          <div>
            <span className="card-label">Buy Orders</span>
            <span className="card-value">{user.buyOrders?.length || 0}</span>
          </div>
          <span className="card-arrow">{">"}</span>
        </Link>
      </div>

      <div className="logout-btn" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default Account;

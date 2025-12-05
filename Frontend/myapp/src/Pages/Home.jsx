import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Css/home.module.css";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import popupsound from "../Media/Sounds/popup.mp3";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
    const [fav, setFav] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [cartcounter, setcartcounter] = useState(0);
    const [loading, setLoading] = useState(true);        // <-- NEW
    const ip = process.env.REACT_APP_IP;
    const navigate = useNavigate();

    // ------------------------------
    // Fetch products from backend
    // ------------------------------
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`${ip}/api/products`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);                      // <-- NEW
            }
        };

        getProducts();
    }, []);

    // ------------------------------
    // Add to Cart
    // ------------------------------
    const handleAddToCart = async (item) => {
        const audio = new Audio(popupsound);
        audio.play();
        try {
            const res = await fetch(`${ip}/api/cart/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: item._id }),
            });

            if (!res.ok) {
                console.error('Failed to add item to cart');
                return;
            }

            setcartcounter((prev) => prev + 1);
        } catch (err) {
            console.error('Network error:', err);
        }
    };

    // ------------------------------
    // Favorite Toggle
    // ------------------------------
    const toggleFav = (id) => {
        setFav((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    // ------------------------------
    // Filter Products
    // ------------------------------
    const filteredProducts = useMemo(() => {
        if (!search) return products;
        return products.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);

    // ------------------------------
    // Skeleton Card Component
    // ------------------------------
    const SkeletonCard = () => (
        <div className="bg-gray-800 rounded-3 p-3 animate-pulse">
            <div className="bg-gray-700 mb-3" style={{ height: "150px", borderRadius: "12px" }}></div>
            <div className="bg-gray-700 mb-2" style={{ height: "18px", width: "70%" }}></div>
            <div className="bg-gray-700 mb-2" style={{ height: "18px", width: "40%" }}></div>
            <div className="bg-gray-700" style={{ height: "40px", borderRadius: "10px" }}></div>
        </div>
    );

    // ------------------------------
    // UI
    // ------------------------------
    return (
        <div className="bg-black min-vh-100 text-white py-4">
            <Header onSearch={setSearch} cartcounterstate={cartcounter} />
            <Banner />

            <div style={{ marginTop: "80px" }} className={styles.mainparent}>
                <div className={`${styles.homegridcontainer} grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6`}>

                    {/* --------------------------- */}
                    {/* SHOW SKELETON WHILE LOADING */}
                    {/* --------------------------- */}
                    {loading
                        ? Array.from({ length: 15 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                        : filteredProducts.map((item) => (
                            <div key={item._id} className={`${styles.cardparent} d-flex justify-content-around items-center`}>

                                <div
                                    className={`card ${styles.card}`}
                                    onClick={() => navigate(`/product/${item._id}`, { state: item })}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className={`${styles.imgContainer} position-relative`}>

                                        <i
                                            className={`bi bi-heart-fill fs-4 position-absolute ${styles.heartIcon}`}
                                            style={{ color: fav.includes(item._id) ? "red" : "white" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFav(item._id);
                                            }}
                                        ></i>

                                        <LazyLoadImage src={item.url} alt={item.name} />
                                    </div>

                                    <div className="card-body">
                                        <h6 className="mb-1 font-bold fs-6" style={{ fontFamily: "arial", fontWeight: "bolder" }}>
                                            {item.name}
                                        </h6>

                                        <div className="mt-2 d-flex align-items-center mb-2">
                                            <span className={styles.rating}>{item.rating}</span>
                                        </div>

                                        <p className="m-0">
                                            <span className="text-success fs-5">${item.price}</span>
                                            <span className="text-decoration-line-through text-danger ms-2">
                                                ${item.price + 50}
                                            </span>
                                        </p>

                                        <button
                                            className="btn btn-primary mt-3 w-100 py-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(item);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className={`${styles.mobileNav} d-md-none`}>
                <div className={styles.navItems}>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        <i className="bi bi-house-door-fill fs-2"></i>
                    </Link>

                    {localStorage.getItem("jwt") ? (
                        <Link to="/account" style={{ textDecoration: "none", color: "white" }}>
                            <i className="bi bi-person fs-2"></i>
                        </Link>
                    ) : (
                        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
                            <i className="bi bi-person fs-2"></i>
                        </Link>
                    )}

                    <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
                        <i className="bi bi-bag fs-2"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

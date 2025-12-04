import React, { useState, useEffect } from "react";
import styles from "../Css/home.module.css";
import { Link } from "react-router-dom";

const Header = ({ onSearch, cartcounterstate }) => {
    const [query, setQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return (
        <>
            <nav className={`${styles.navbarModern} w-100 text-white fixed top-0`}
                style={{ zIndex: 5 }}
            >
                <div className="container py-3">
                    <div className="row align-items-center">

                        {/* LEFT: Logo */}
                        <div className="col-6 col-md-4 d-flex align-items-center">
                            <h2 className="m-0">RetroShop</h2>
                        </div>

                        {/* CENTER: Desktop Search */}
                        <div className="col-md-4 d-none d-md-flex justify-content-center">
                            <input
                                type="search"
                                placeholder="Search products..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={`
                                    ${styles.search}
                                    form-control w-75 py-2
                                    bg-transparent text-white
                                    border border-white/25
                                `}
                            />
                        </div>

                        {/* RIGHT: Desktop Menu */}
                        <div className="col-md-4 d-none d-md-flex justify-content-end align-items-center gap-4">
                            {
                                localStorage.getItem('jwt') ? (<>
                                    <div className="w-10 h-10 rounded-full  d-flex align-items-center justify-content-center">
                                        <Link style={{ textDecoration: 'none' }} className="text-white" to="/account">
                                            <i className="bi bi-person fs-2"></i>
                                        </Link>

                                    </div>

                                </>) : (<>
                                    <Link style={{ textDecoration: 'none' }} className="text-white" to="/login">Login</Link>
                                    <Link style={{ textDecoration: 'none' }} className="text-white" to="/signup">SignUp</Link>
                                </>)
                            }

                            <h4 className="position-relative pt-1">
                                <Link style={{ textDecoration: 'none' }} className="text-white" to="/cart">
                                    <i className="bi bi-bag fs-3"></i>
                                </Link>

                                {cartcounterstate !== 0 && (
                                    <sup
                                        className="text-primary position-absolute ms-2"
                                        style={{ top: "5px" }}
                                    >
                                        {cartcounterstate}
                                    </sup>
                                )}
                            </h4>
                        </div>

                        {/* RIGHT: Mobile Hamburger */}
                        <div className="col-6 d-flex d-md-none justify-content-end">
                            <i
                                className="bi bi-list fs-1"
                                style={{ cursor: "pointer" }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            ></i>
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE DROPDOWN MENU */}
            {isMenuOpen && (
                <div
                    className="d-md-none bg-dark text-white py-3 px-4 fixed w-full rounded-b-3xl text-white d-flex flex-col"
                    style={{ animation: "fadeIn 0.2s ease-in", marginTop: '50px', zIndex: '5' }}
                >
                    <div className="mb-3">
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="form-control bg-transparent text-white border border-white/25"
                        />
                    </div>

                    <div className="d-flex flex-column gap-3">
                        {
                            localStorage.getItem('jwt') ? (<>
                                <div className="w-10 h-10 rounded-full d-flex flex-row align-items-center ">
                                    <Link style={{ textDecoration: 'none' }} className="items-center  text-white flex flex-row" to="/account">
                                        <i className="bi bi-person fs-2"></i>
                                        <h4>User</h4>
                                    </Link>

                                </div>

                            </>) : (<>
                                <Link style={{ textDecoration: 'none' }} className="text-white" to="/login">Login</Link>
                                <Link style={{ textDecoration: 'none' }} className="text-white" to="/signup">SignUp</Link>
                            </>)
                        }

                        <Link to="/cart" className="d-flex align-items-center text-white" style={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                            <i className="bi bi-bag fs-4 me-2"></i>
                            Cart
                            {cartcounterstate !== 0 && (
                                <span className="text-primary ms-2">
                                    ({cartcounterstate})
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

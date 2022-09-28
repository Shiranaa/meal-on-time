import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import LogOut from "../auth/LogOut";

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">

                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <i className="bi-cup-hot me-3"></i>
                        Meal On Time
                    </Link>

                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3">
                            {/* use NavLink instead of Link, to mark this route as active using css */}
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item me-3">
                            <NavLink to="/signup" className="nav-link">
                                Sign Up
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <LogOut />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
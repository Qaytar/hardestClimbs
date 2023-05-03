import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';


function NavBar() {
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark ${styles.customNavbar}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sport Climbing
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/SportWoman">Woman</Link></li>
                                    <li><Link className="dropdown-item" to="/SportMan">Man</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Bouldering
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/BoulderMan">Man</Link></li>
                                    <li><Link className="dropdown-item" to="/BoulderWoman">Woman</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;


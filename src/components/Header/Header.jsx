import React, {useState, useEffect, useContext} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { SearchContext } from '../../features/SearchContext';
import '../Header/Header.css';

import userIcon from "../../assets/img/icons-btn/image 1.png";
import searchIcon from "../../assets/img/icons-btn/image 2.png";
import cartIcon from "../../assets/img/icons-btn/image 3.png";

export default function Header({ onUserIconClick, onCartClick }){
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsSearchOpen } = useContext(SearchContext);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const cartItems = useSelector(state => state.cart.items);

    useEffect(()=>{
        const handleScroll = ()=>{
            setIsScrolled(window.scrollY > 20);
        }
        window.addEventListener('scroll', handleScroll);

        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    
    return(
        <div>
            <header  style={styles.header} className={isScrolled ? 'scrolled' : ''}>
                <div style={styles.container} className="container">
                    <Link to="/">
                        <h1 style={styles.title}>Clio</h1>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav style={styles.nav} className="desktop-nav">
                        <Link to="/all-products" style={location.pathname === '/all-products' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>All products</Link>
                        <Link to="/lip" style={location.pathname === '/lip' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>Lip</Link>
                        <Link to="/palettes" style={location.pathname === '/palettes' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>Eye</Link>
                        <Link to="/face" style={location.pathname === '/face' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>Face</Link>
                    </nav>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <nav style={styles.mobileNav} className="mobile-nav">
                            <Link to="/all-products" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>All products</Link>
                            <Link to="/lip" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Lip</Link>
                            <Link to="/palettes" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Eye</Link>
                            <Link to="/face" style={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Face</Link>
                            
                        </nav>
                    )}
                    
                    <nav style={styles.icons}>
                        <div style={styles.userIconContainer}>
                            <button
                                onClick={() => isAuthenticated ? setIsUserMenuOpen(!isUserMenuOpen) : onUserIconClick()}
                                style={styles.userBtn}
                                title={isAuthenticated ? user?.name : 'Login'}
                            >
                                <img src={userIcon} alt="user icon" />
                            </button>
                            {isAuthenticated && isUserMenuOpen && (
                                <div style={styles.userMenu}>
                                    <div style={styles.userInfo}>
                                        <p style={styles.userName}>{user?.name}</p>
                                        <p style={styles.userEmail}>{user?.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigate('/profile');
                                            setIsUserMenuOpen(false);
                                        }}
                                        style={styles.profileBtn}
                                    >
                                        My Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                            setIsUserMenuOpen(false);
                                        }}
                                        style={styles.logoutBtn}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            style={styles.searchBtn}
                        >
                            <img src={searchIcon} alt="search icon" />
                        </button>
                        <div style={styles.cartContainer}>
                            <button 
                                onClick={onCartClick}
                                style={styles.cartBtn}
                                title="Shopping cart"
                            >
                                <img src={cartIcon} alt="cart icon" />
                                {cartItems.length > 0 && (
                                    <span style={styles.cartBadge}>{cartItems.length}</span>
                                )}
                            </button>
                        </div>
                        
                        {/* Hamburger Menu */}
                        <button 
                            className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            style={styles.hamburgerBtn}
                            title="Menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </nav>
                </div>
            </header>
        </div>
    )
}
const styles = {
    header: {
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#F1C3C3',
        zIndex: 1000,
        boxShadow: 'none',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        fontFamily: 'RegularFont',
    },
    title: {
        margin: 0,
        fontSize: '40px',
        color: '#000',
        fontWeight: '400',
    },
    nav: {
        display: 'flex',
        gap: '30px',
        fontSize: '25px',
        fontFamily: 'RegularFont',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mobileNav: {
        position: 'absolute',
        top: '60px',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'column',
        gap: 0,
        padding: '12px 0',
        borderBottom: '1px solid #f0f0f0',
        zIndex: 100,
    },
    mobileNavLink: {
        padding: '12px 20px',
        display: 'block',
        borderBottom: '1px solid #f0f0f0',
        fontSize: '14px',
        fontFamily: 'RegularFont',
        color: '#000',
        textDecoration: 'none',
    },
    hamburgerBtn: {
        display: 'none',
        flexDirection: 'column',
        gap: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
    },
    icons: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
    },
    userIconContainer: {
        position: 'relative',
    },
    userBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
    },
    userMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '15px 20px',
        marginTop: '10px',
        minWidth: '200px',
        zIndex: 1001,
    },
    userInfo: {
        marginBottom: '15px',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '15px',
    },
    userName: {
        margin: '0 0 5px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#000',
        fontFamily: 'RegularFont, sans-serif',
    },
    userEmail: {
        margin: 0,
        fontSize: '12px',
        color: '#999',
        fontFamily: 'RegularFont, sans-serif',
    },
    profileBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#E8F5FF',
        color: '#2196F3',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'RegularFont, sans-serif',
        transition: 'background-color 0.3s ease',
        marginBottom: '10px',
    },
    logoutBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#FFBCBC',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: 'RegularFont, sans-serif',
        transition: 'background-color 0.3s ease',
    },
    searchBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
    },
    navLink: {
        textDecoration: 'none',
        color: '#000',
        transition: 'border-bottom 0.3s ease',
        borderBottom: '2px solid transparent',
        paddingBottom: '4px',
    },
    activeLink: {
        borderBottom: '2px solid #000',
    },
    cartContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    cartBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease',
    },
    cartBadge: {
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: '#FFBCBC',
        color: '#000',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
    },
}
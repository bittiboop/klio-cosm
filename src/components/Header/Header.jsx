import React, {useState, useEffect, useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchContext } from '../../features/SearchContext';
import '../Header/Header.css';

import userIcon from "../../assets/img/icons-btn/image 1.png";
import searchIcon from "../../assets/img/icons-btn/image 2.png";
import cartIcon from "../../assets/img/icons-btn/image 3.png";

export default function Header(){
    const [isScrolled, setIsScrolled] = useState(false);
    const { setIsSearchOpen } = useContext(SearchContext);
    const location = useLocation();

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
                    <nav style={styles.nav}>
                        <Link to="/all-products" style={location.pathname === '/all-products' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>All products</Link>
                        <Link to="/lip" style={location.pathname === '/lip' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>Lip</Link>
                        <Link to="/palettes" style={location.pathname === '/palettes' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>Eye</Link>
                        <Link to="/face" style={location.pathname === '/face' ? {...styles.navLink, ...styles.activeLink} : styles.navLink}>Face</Link>
                    </nav>
                    <nav style={styles.icons}>
                        <Link to="/">
                            <img src={userIcon} alt="user icon" />
                        </Link>
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            style={styles.searchBtn}
                        >
                            <img src={searchIcon} alt="search icon" />
                        </button>
                        <Link to="/">
                            <img src={cartIcon} alt="cart icon" />
                        </Link>
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
    icons: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
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
}
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import userIcon from "../../src/assets/img/icons-btn/image 1.png";
import searchIcon from "../../src/assets/img/icons-btn/image 2.png";
import cartIcon from "../../src/assets/img/icons-btn/image 3.png";

import './Header.css';


export default function Header(){
    const [isScrolled, setIsScrolled] = useState(false);

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
                        <Link to="*">All products</Link>
                        <Link to="/lip">Lip</Link>
                        <Link to="/palettes">Eye</Link>
                        <Link to="/face">Face</Link>
                    </nav>
                    <nav style={styles.icons}>
                        <Link to="*">
                            <img src={userIcon} alt="user icon" />
                        </Link>
                        <Link to="*">
                            <img src={searchIcon} alt="search icon" />
                        </Link>
                        <Link to="*">
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
    }
}
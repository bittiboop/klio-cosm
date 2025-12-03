import React, {useState, useEffect} from 'react';
import Link from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import userIcon from "../../src/assets/img/icons-btn/image 1.png";
import searchIcon from "../../src/assets/img/icons-btn/image 2.png";
import cartIcon from "../../src/assets/img/icons-btn/image 3.png";


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
        <>
            <header  style={styles.header} className={isScrolled ? 'scrolled' : ''}>
                <div style={styles.container} className="container">
                    <Link to="/">
                        <h1 style={styles.title}>Clio</h1>
                    </Link>       
                    <nav style={styles.nav}>
                        <Link to="/products">All products</Link>
                        <Link to="/lip-products">Lip</Link>
                        <Link to="/eye-products">Eye</Link>
                        <Link to="/face-products">Face</Link>
                    </nav>
                    <nav style={styles.icons}>
                        <Link to="/user">
                            <img src={userIcon} alt="user icon" />
                        </Link>
                        <Link to="/search">
                            <img src={searchIcon} alt="search icon" />
                        </Link>
                        <Link to="/cart">
                            <img src={cartIcon} alt="cart icon" />
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    )
}
const styles ={
    header:{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#F1C3C3'
    },
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px'
    },
    title:{
        margin: 0,
        fontSize: '40px',
        color: '#000',
    },
    nav:{
        display: 'flex',
        gap: '10px',
        fontSize: '20px',
        fontWeight: '500'
    },
    icons:{
        display: 'flex',
        gap: '18px'
    }
}
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

import '../Footer/Footer.css';

export default function Footer(){
    const [isVisible, setIsVisible] = useState(false);

  
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };  
        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return(
        <div>
            <footer style={styles.footer}>
                <div style={styles.container} className="container">
                    <Link to="/">
                        <h1 style={styles.title}>Clio</h1>
                    </Link>       
                    <nav style={styles.nav}>
                        <Link to="/about">About us</Link>
                        <Link to="/lip-products">Customer Service</Link>
                        <Link to="/eye-products">NewsLetter</Link>
                    </nav>
                    </div>
            </footer>
            {/* returning button to the start of the page */}
            {isVisible && (
                <button onClick={scrollToTop} style={styles.scrollToTopButton}>
                    <ArrowUp />
                </button>
            )}
        </div>
    )
}

const styles = {
    footer: {
        width: '100%',
        backgroundColor: '#F1C3C3',
        zIndex: 1000,
        boxShadow: 'none',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 30px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
    },
    title: {
        margin: 0,
        fontSize: '40px',
        fontWeight: '400',
        color: '#000',
    },
    nav: {
        display: 'flex',
        gap: '40px',
        fontSize: '25px',
        fontWeight: '400',
        flex: 1,
        justifyContent: 'center',
    },
    scrollToTopButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#ffdcdcff',
        padding: '12px',
        borderRadius: '50%',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
    }
}
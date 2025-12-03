import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

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
        <>
            <footer style={styles.footer}>
                <div style={styles.container} className="container">
                    <Link to="/">
                        <h1 style={styles.title}>Clio</h1>
                    </Link>       
                    <nav style={styles.nav}>
                        <Link to="/products">About us</Link>
                        <Link to="/lip-products">Customer Service</Link>
                        <Link to="/eye-products">NewsLetter</Link>
                    </nav>
                    {/* returning button to the start of the page */}
                    {isVisible && (
                        <button onClick={scrollToTop} style={styles.scrollToTopButton}>
                            <ArrowUp size={24} />
                        </button>
                    )}
                    </div>
            </footer>
        </>
    )
}

const styles ={
    footer:{
        padding: '20px 17px',
        backgroundColor: '#F1C3C3',
        marginTop: '30px'
    },
    container:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    scrollToTopButton:{
        position: 'fixed',
        bottom: '8px',
        right: '8px',
        backgroundColor: '#efd1d1ff',
        hover:{
            backgroundColor: '#f1c3c3ff'
        },
        padding: '10px',
        borderRadius: '50%',
        border: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }
}
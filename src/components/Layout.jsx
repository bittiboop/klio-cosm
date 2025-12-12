import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';


export default function Layout({ authModalOpen, onCartClick }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return(
        <div style={styles.container}>
            <Header onUserIconClick={authModalOpen} onCartClick={onCartClick} />

            <main style={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

const styles={
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 0,
        padding: 0,
        flexWrap: 'wrap',
        boxSizing: 'border-box',
    },
    main: {
        flex: 1,
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
}
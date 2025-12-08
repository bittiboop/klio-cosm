import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';


export default function Layout({ authModalOpen }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return(
        <div style={styles.container}>
            <Header onUserIconClick={authModalOpen} />

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
        minHeight: '100vh',
    },
    main: {
        flex: 1,
    },
}
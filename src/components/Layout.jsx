import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
    return(
        <div style={styles.container}>
            <Header />
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
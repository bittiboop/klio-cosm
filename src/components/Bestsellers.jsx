import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const bestsellersData = {
    '/': { 
        id: 1, 
        image: 'assets/img/bestsellers/image.png',
        title: 'Bestseller of the month',
        subtitle: 'Clio Kill Cover Cushion',
        description: 'The Clio Kill Cover Cushion is designed for a flawless, long-lasting finish. Infused with nourishing and gentle skincare ingredients, it provides a smooth, natural look while keeping your skin hydrated.'
    },
    '/lip': { 
        id: 2, 
        image: 'assets/img/bestsellers/image 1.png',
        title: 'Lip Product Bestseller',
        subtitle: 'Tint Lip Stain',
        description: 'A lightweight, long-wearing lip tint that delivers vibrant color and a comfortable feel throughout the day.'
    },
    '/palettes': { 
        id: 3, 
        image: 'assets/img/bestsellers/image 3.png',
        title: 'Eye Palette Bestseller',
        subtitle: 'Shadow Gallery Pro',
        description: 'A versatile collection of highly pigmented eyeshadows, perfect for creating everyday or bold looks with ease.'
    },
    '/face': { 
        id: 4, 
        image: 'assets/img/bestsellers/image 2.png',
        title: 'Face Product Bestseller',
        subtitle: 'Cushion Foundation',
        description: 'A cushion foundation that provides buildable coverage while keeping your skin hydrated and luminous.'
    },
};

export default function Bestsellers() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentPath = location.pathname;
    const bestseller = bestsellersData[currentPath] || bestsellersData['/'];

    const handleShopNow = () => {
        navigate('/all-products');
    };

    let imageUrl = bestseller.image;
    try {
        imageUrl = require(`../assets/img/bestsellers/${bestseller.image.split('/').pop()}`);
    } catch (e) {
        console.log(`Image not found: ${bestseller.image}`, e);
    }
    return(
        <div style={styles.wrapper}>
        <div style={styles.bestsellersContainer(isMobile)}>
            <div style={styles.imageSection(isMobile)}>
                <img
                src={imageUrl}
                alt={bestseller.subtitle}
                style={styles.bestsellerImage}
                />
            </div>
            <div style={styles.contentSection(isMobile)}>
                <h2 style={styles.title(isMobile)}>{bestseller.title}</h2>
                <h3 style={styles.subtitle(isMobile)}>{bestseller.subtitle}</h3>
                <p style={styles.description(isMobile)}>
                    {bestseller.description}
                </p>
                <button style={styles.button(isMobile)} onClick={handleShopNow}>Shop now</button>
            </div>
        </div>
        </div>
    )
}

const styles={
    wrapper:{
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    bestsellersContainer: (isMobile) => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: isMobile ? '15px' : '20px',
        gap: isMobile ? '15px' : '20px',
        width: '100%',
        boxSizing: 'border-box',
    }),
    imageSection: (isMobile) => ({
        flex: 1,
        minWidth: isMobile ? '100%' : '350px',
        width: isMobile ? '100%' : 'auto',
    }),
    bestsellerImage:{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
    },
    contentSection: (isMobile) => ({
        flex: 1,
        padding: isMobile ? '20px' : '40px',
    }),
    title: (isMobile) => ({
        fontSize: isMobile ? '24px' : '40px',
        fontFamily: 'MediumFont',
        marginBottom: '10px',
    }),
    subtitle: (isMobile) => ({
        fontSize: isMobile ? '18px' : '25px',
        fontFamily: 'RegularFont',
        marginBottom: '10px',
    }),
    description: (isMobile) => ({
        fontSize: isMobile ? '13px' : '15px',
        fontFamily: 'RegularFont',
        margin: '20px 0',
        lineHeight: '1.6'
    }),
    button: (isMobile) => ({
        backgroundColor: '#FFBCBC',
        border: 'none',
        padding: isMobile ? '10px 20px' : '15px 30px',
        fontSize: isMobile ? '16px' : '25px',
        cursor: 'pointer',
        color: '#000',
        fontFamily: 'MediumFont',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    })
}
import React from 'react';
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
        <div style={styles.bestsellersContainer}>
            <div style={styles.imageSection}>
                <img
                src={imageUrl}
                alt={bestseller.subtitle}
                style={styles.bestsellerImage}
                />
            </div>
            <div style={styles.contentSection}>
                <h2 style={styles.title}>{bestseller.title}</h2>
                <h3 style={styles.subtitle}>{bestseller.subtitle}</h3>
                <p style={styles.description}>
                    {bestseller.description}
                </p>
                <button style={styles.button} onClick={handleShopNow}>Shop now</button>
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
    bestsellersContainer:{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '20px',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
    },
    imageSection:{
        flex:1,
        minWidth: '350px'
    },
    bestsellerImage:{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
    },
    contentSection:{
        flex:1,
        padding: '40px',
    },
    title:{
        fontSize: '40px',
        fontFamily: 'MediumFont',
        marginBottom: '10px',
    },
    subtitle:{
        fontSize: '25px',
        fontFamily: 'RegularFont',
        marginBottom: '10px',
    },
    description:{
        fontSize: '15px',
        fontFamily: 'RegularFont',
        margin: '20px 0',
        lineHeight: '1.6'
    },
    button:{
        backgroundColor: '#FFBCBC',
        border: 'none',
        padding: '15px 30px',
        fontSize: '25px',
        cursor: 'pointer',
        color: '#000',
        fontFamily: 'MediumFont',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }
}
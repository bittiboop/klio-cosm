import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard.jsx';
import ProductList from '../../../assets/data/products.json';

export default function OurProducts() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return(
        <div style={styles.wrapper}>
            <div style={styles.ourProductsContainer}>
                <h2 style={styles.ourProductsTitle}>Our Products</h2>
                <div style={styles.productsListContainer(isMobile)}>
                    {ProductList.products.slice(0,6).map((product) => (
                        <ProductCard key={product.id} ProductList={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
const styles = {
    wrapper: {
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    ourProductsContainer: {
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '60px 20px',
        width: '100%',
        boxSizing: 'border-box',
    },
    ourProductsTitle: {
        fontSize: '32px',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: '50px',
        color: '#000',
    },
    productsListContainer: (isMobile) => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '15px' : '30px',
        justifyItems: 'center',
    }),
}
import React, { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard.jsx';
import ProductList from '../../../assets/data/products.json';

export default function MightBeInterested({ currentProductId, category }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get products from the same category, excluding current product
    const relatedProducts = ProductList.products
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 2);

    if (relatedProducts.length === 0) {
        return null;
    }

    return(
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={styles.title}>You might be interested in</h2>
                <div style={styles.productsGrid(isMobile)}>
                    {relatedProducts.map((product) => (
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
    container: {
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '60px 20px',
        width: '100%',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '32px',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: '50px',
        color: '#000',
    },
    productsGrid: (isMobile) => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
        gap: isMobile ? '15px' : '30px',
        justifyItems: 'center',
        maxWidth: '600px',
        margin: '0 auto',
    }),
};

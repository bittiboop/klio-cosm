import React from 'react';
import ProductCard from '../../../components/ProductCard.jsx';
import ProductList from '../../../assets/data/products.json';

export default function OurProducts() {
    return(
        <div        >
            <div style={styles.ourProductsContainer}>
                <h2 style={styles.ourProductsTitle}>Our Products</h2>
                <div style={styles.productsListContainer}>
                    {ProductList.products.slice(0,6).map((product) => (
                        <ProductCard key={product.id} ProductList={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
const styles = {
    ourProductsContainer: {
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '60px 20px'
    },
    ourProductsTitle: {
        fontSize: '32px',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: '50px',
        color: '#000',
    },
    productsListContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        justifyItems: 'center',
    },
}
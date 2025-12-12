import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard.jsx';
import ProductList from '../../assets/data/products.json';
import MoreToSee from '../../components/MoreToSee.jsx';
import Bestsellers from '../../components/Bestsellers.jsx';
import DealOfTheMonth from '../Main/components/DealOfTheMonth.jsx';
import Pagination from '../../features/Pagination.jsx'

export default function EyePalettes() {
    const eyePalettes = ProductList.products.filter(product => product.category === 'eye-palettes');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    
    const totalPages = Math.ceil(eyePalettes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = eyePalettes.slice(startIndex, endIndex);

    return(
        <div style={styles.container}>
            <DealOfTheMonth />
            <div style={styles.pageWrapper}>
                <h1 style={styles.title}>Eye palettes</h1>
                
                <div style={styles.productsListContainer}>
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} ProductList={product} />
                    ))}
                </div>
                
                {totalPages > 1 && (
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={setCurrentPage}
                    />
                )}
                
                <Bestsellers />
                <MoreToSee />
            </div>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#fff',
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    pageWrapper: {
        width: '100%',
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '60px 20px',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '32px',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: '50px',
        color: '#000',
        fontFamily: 'RegularFont, sans-serif',
    },
    productsListContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        justifyItems: 'center',
    },
}

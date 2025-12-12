import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard.jsx';
import ProductList from '../../assets/data/products.json';
import DealOfTheMonth from '../Main/components/DealOfTheMonth.jsx';
import MoreToSee from '../../components/MoreToSee.jsx';
import Bestsellers from '../../components/Bestsellers.jsx';
import Pagination from '../../features/Pagination.jsx'

export default function AllProducts() {
    const allProducts = ProductList.products;
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const itemsPerPage = 6;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex);

    return(
        <div style={styles.container}>
            
            <DealOfTheMonth />
            <div style={styles.pageWrapper}>
                <h1 style={styles.title}>All products</h1>
                
                <div style={styles.productsListContainer(isMobile)}>
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
    productsListContainer: (isMobile) => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '15px' : '30px',
        justifyItems: 'center',
    }),
}

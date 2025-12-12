import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard.jsx';
import ProductList from '../../assets/data/products.json';
import MoreToSee from '../../components/MoreToSee.jsx';
import Bestsellers from '../../components/Bestsellers.jsx';
import DealOfTheMonth from '../Main/components/DealOfTheMonth.jsx';
import Pagination from '../../features/Pagination.jsx'

export default function LipProducts() {
    const lipProducts = ProductList.products.filter(product => product.category === 'lip-products');
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
    
    const totalPages = Math.ceil(lipProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = lipProducts.slice(startIndex, endIndex);

    return(
        <div style={styles.container}>
            <DealOfTheMonth />
            <div style={styles.pageWrapper}>
                <h1 style={styles.title}>Lip products</h1>
                
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

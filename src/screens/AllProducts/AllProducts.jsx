import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard.jsx';
import ProductList from '../../assets/data/products.json';
import DealOfTheMonth from '../Main/components/DealOfTheMonth.jsx';
import MoreToSee from '../../components/MoreToSee.jsx';
import Bestsellers from '../../components/Bestsellers.jsx';
import Pagination from '../../features/Pagination.jsx'

export default function AllProducts() {
    const allProducts = ProductList.products;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex);

    return(
        <div style={styles.container}>
            
            <DealOfTheMonth />
            <div style={styles.pageWrapper}>
                <h1 style={styles.title}>All products</h1>
                
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
    },
    pageWrapper: {
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '60px 20px',
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

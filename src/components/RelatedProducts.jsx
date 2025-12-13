import React, { useMemo, useState, useEffect } from 'react';
import ProductCard from './ProductCard'; 
import ProductList from '../assets/data/products.json';

function RelatedProducts({ currentProductId, category }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const relatedItems = useMemo(() => {
    if (!currentProductId || !category || !ProductList.products) return [];

    return ProductList.products
      .filter((item) => {
        const isSameCategory = item.category === category;
        const isNotCurrent = item.id !== currentProductId;
        
        return isSameCategory && isNotCurrent;
      })
      .slice(0, 4);
  }, [currentProductId, category]);

  return (
    <section style={styles.container(isMobile)}>
      <h2 style={styles.heading}>Might be interesting...</h2>
      
      <div style={styles.grid(isMobile)}>
        {relatedItems.map((product) => (
          <ProductCard 
            key={product.id} 
            ProductList={product} 
          />
        ))}
      </div>
    </section>
  );
}

const styles = {
    container: (isMobile) => ({
        margin: isMobile ? '30px 0' : '40px 0',
        padding: isMobile ? '0 15px' : '0',
        textAlign: 'center',
        boxSizing: 'border-box',
    }),
    heading: {
        fontSize: '28px',
        fontFamily: 'MediumFont',
        marginBottom: '24px'
    },
    grid: (isMobile) => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '15px' : '30px',
        justifyItems: 'center',
    })
}

export default RelatedProducts;
import React, { useMemo } from 'react';
import ProductCard from './ProductCard'; 
import ProductList from '../assets/data/products.json';

function RelatedProducts({ currentProductId, category }) {
  const relatedItems = useMemo(() => {
    if (!currentProductId || !category || !ProductList.products) return [];

    return ProductList.products
      .filter((item) => {
        const isSameCategory = item.category === category;
        const isNotCurrent = item.id !== currentProductId;
        
        return isSameCategory && isNotCurrent;
      })
      .slice(0, 3);
  }, [currentProductId, category]);

  if (relatedItems.length === 0) return null;

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Might be interesting...</h2>
      
      <div style={styles.grid}>
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
    container: {
        margin: '40px 0',
        textAlign: 'center'
    },
    heading: {
        fontSize: '28px',
        fontFamily: 'MediumFont',
        marginBottom: '24px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        justifyItems: 'center'
    }
}

export default RelatedProducts;
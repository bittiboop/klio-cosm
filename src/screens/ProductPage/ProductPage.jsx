import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '../../assets/data/products.json';
import ProductTabs from '../../screens/ProductPage/components/ProductsTabs.jsx';
import ProductMainInfo from '../../screens/ProductPage/components/ProductMainInfo.jsx';
import RelatedProducts from '../../components/RelatedProducts.jsx';
import MoreToSee from '../../components/MoreToSee.jsx';


export default function ProductPage(){
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);

    useEffect(()=>{
        const product = ProductList.products.find(p => p.id === productId);
        setProductData(product);

        window.scrollTo(0, 0);  
    }, [productId]);

    if (!productData) {
        return <div>Loading...</div>;
    }

    return(
        <div style={styles.pageWrapper}>
            <ProductMainInfo 
            ProductList={ProductList} 
            productId={productId} />

            <ProductTabs productList={productData} />

            <hr style={styles.divider} />

            <RelatedProducts 
            currentProductId={productId} 
            category={productData.category} />
            <MoreToSee/>
        </div>
    )
}

const styles = {
    pageWrapper: {
      maxWidth: '1280px', 
      margin: '0 auto',
      padding: '0 20px',
      fontFamily: "RegularFont",
    },
    divider: {
      border: 'none',
      borderTop: '1px solid #eee',
      margin: '60px 0 40px 0',
    }
  };
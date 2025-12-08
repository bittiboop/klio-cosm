import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heartIcon from "../../../assets/img/icons-btn/heart-icon.png";
import ProductList from '../../../assets/data/products.json';
import likedHeartIcon from "../../../assets/img/icons-btn/liked-heart-icon.png";

export default function ProductMainInfo({ProductList, productId}) {
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    
    if (!productId) {
        return <div>Loading...</div>;
    }

    const product = ProductList.products.find(p => p.id === productId);
    
    if (!product) {
        return <div>Product not found</div>;
    }
    
    const category = ProductList.categories.find(c => c.id === product.category);
    const categoryName = category ? category.name : product.category;
    
    const imagesPaths = product.images || [product.image];
    
    
    const getImage = (imagePath) => {
        try {
            return require(`../../../${imagePath}`);
        } catch (e) {
            return 'https://via.placeholder.com/400?text=No+Image';
        }
    };
    
    return(
        <div style={styles.wrapper}>
            <div style={styles.breadcrumbs}>
                <Link to="/" style={styles.breadcrumbLink}>All products</Link>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>{categoryName}</span>
            </div>

            <div style={styles.container}>
                <div style={styles.imageSection}>
                    <div style={styles.mainImageWrapper}>
                        <img 
                            src={getImage(imagesPaths[selectedImage])}
                            alt={product.name} 
                            style={styles.mainImg}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400?text=No+Image';
                            }}
                        />
                    </div>
                </div>

                
                <div style={styles.infoSection}>
                    <h1 style={styles.title}>{product.name}</h1>
            
                    <div style={styles.metaInfo}>
                        <span style={styles.weight}>{product.weight || '9.0'} gramm</span>
                        {product.subtitle && 
                            <span style={styles.shadeTag}>
                                <span style={styles.shadeDot}>●</span> {product.subtitle}
                            </span>
                        }
                    </div>

                    <p style={styles.description}>
                        {product.description || "The Clio Kill Cover Cushion is your go-to for a flawless finish..."}
                    </p>

                    <div style={styles.priceBlock}>
                        {product.originalPrice && (
                            <span style={styles.oldPrice}>{product.originalPrice}{product.currency}</span>
                        )}
                        <span style={styles.currentPrice}>{product.price}{product.currency}</span>
                    </div>

                    <div style={styles.actions}>
                        <button style={styles.addToCartBtn}>Add to cart</button>
                        <button style={styles.wishlistBtn} onClick={() => setIsLiked(!isLiked)}>
                            <img src={isLiked ? likedHeartIcon : heartIcon} alt="like icon" style={styles.iconImg} />
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

const styles = {
    wrapper: {
        paddingTop: '100px',
    },
    breadcrumbs: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '30px',
        fontFamily: 'RegularFont',
        textAlign: 'left',
    },
    breadcrumbLink: {
        color: '#666',
        textDecoration: 'none',
    },
    breadcrumbSeparator: {
        margin: '0 8px',
        color: '#bbb',
    },
    breadcrumbCurrent: {
        color: '#333',
    },
    container: {
      display: 'flex',
      gap: '50px',
      padding: '20px 0',
      alignItems: 'flex-start',
    },
    imageSection: {
      flex: '0 0 40%',
    },
    mainImageWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '350px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '15px',
      border: '1px solid #eee',
    },
    mainImg: {
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '350px',
      objectFit: 'contain',
      width: '100%',
    },
    infoSection: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: '10px',
    },
    title: {
      fontSize: '32px',
      fontFamily: 'MediumFont, sans-serif',
      margin: '0 0 8px 0',
      color: '#1a1a1a',
      fontWeight: '600',
      lineHeight: '1.3',
    },
    metaInfo: {
      marginBottom: '16px',
      color: '#666',
      fontSize: '14px',
      fontFamily: 'RegularFont, sans-serif',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    },
    weight: {
      fontFamily: 'RegularFont, sans-serif',
    },
    shadeTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      backgroundColor: '#FFE5E5',
      borderRadius: '12px',
      color: '#FF9B9B',
      fontSize: '13px',
      fontFamily: 'RegularFont, sans-serif',
      fontWeight: '500',
    },
    shadeDot: {
      fontSize: '16px',
      lineHeight: '1',
      color: '#FFBCBC',
    },
    description: {
      lineHeight: '1.6',
      color: '#555',
      marginBottom: '20px',
      fontSize: '14px',
      fontFamily: 'RegularFont, sans-serif',
    },
    priceBlock: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
      paddingTop: '0px',
    },
    oldPrice: {
      textDecoration: 'line-through',
      color: '#999',
      fontSize: '16px',
      fontFamily: 'RegularFont, sans-serif',
    },
    currentPrice: {
      fontSize: '28px',
      fontFamily: 'SemiBoldFont, sans-serif',
      color: '#000',
      fontWeight: '700',
      letterSpacing: '-0.5px',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      marginBottom: '0px',
    },
    addToCartBtn: {
      flex: 1,
      padding: '12px 28px',
      backgroundColor: '#FF9B9B',
      color: '#000',
      border: 'none',
      borderRadius: '6px',
      fontSize: '15px',
      fontFamily: 'MediumFont, sans-serif',
      cursor: 'pointer',
      boxShadow: 'none',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    wishlistBtn: {
      padding: '12px 14px',
      border: '1.5px solid #e0e0e0',
      backgroundColor: '#fff',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    iconImg: {
      width: '18px',
      height: '18px',
    },
  };

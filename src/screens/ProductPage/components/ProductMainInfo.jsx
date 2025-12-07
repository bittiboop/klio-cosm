import React, { useState } from 'react';
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
    
    // Helper function to get image path
    const getImagePath = (imagePath) => {
        try {
            const cleanPath = imagePath.replace('assets/', '../../../assets/');
            return require(`${cleanPath}`);
        } catch (error) {
            console.error('Image not found:', imagePath);
            return null;
        }
    };
    
    // Support multiple images
    const imagesPaths = product.images || [product.image];
    const images = imagesPaths.map(img => getImagePath(img)).filter(img => img !== null);
    
    return(
       <div style={styles.container}>
            {/* Left side - Product Image */}
            <div style={styles.imageSection}>
                <div style={styles.mainImageWrapper}>
                    {images.length > 0 ? (
                        <img 
                            src={images[selectedImage]} 
                            alt={product.name} 
                            style={styles.mainImg} 
                        />
                    ) : (
                        <div style={styles.noImage}>No image available</div>
                    )}
                </div>
            </div>

            {/* Right side - Product Information */}
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
                        <span style={styles.oldPrice}>{product.originalPrice}{ProductList.currency}</span>
                    )}
                    <span style={styles.currentPrice}>{product.price}{ProductList.currency}</span>
                </div>

                {/* Action Buttons */}
                <div style={styles.actions}>
                    <button style={styles.addToCartBtn}>Add to cart</button>
                    <button style={styles.wishlistBtn} onClick={() => setIsLiked(!isLiked)}>
                        <img src={isLiked ? likedHeartIcon : heartIcon} alt="like icon" style={styles.iconImg} />
                    </button>
                </div>
            </div>
        </div> 
    )
}

const styles = {
    container: {
      display: 'flex',
      gap: '50px',
      padding: '40px 0',
      alignItems: 'flex-start',
      maxWidth: '1000px',
    },
    imageSection: {
      flex: '0 0 45%',
    },
    mainImageWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '350px',
      backgroundColor: '#faf8f6',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #f0f0f0',
    },
    mainImg: {
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '400px',
      objectFit: 'contain',
    },
    noImage: {
      color: '#999',
      fontSize: '14px',
    },
    infoSection: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: '0px',
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
      marginBottom: '12px',
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
      color: '#d65a5a',
      fontSize: '13px',
      fontFamily: 'RegularFont, sans-serif',
      fontWeight: '500',
    },
    shadeDot: {
      fontSize: '16px',
      lineHeight: '1',
      color: '#d65a5a',
    },
    description: {
      lineHeight: '1.6',
      color: '#555',
      marginBottom: '16px',
      fontSize: '14px',
      fontFamily: 'RegularFont, sans-serif',
    },
    priceBlock: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
      paddingTop: '0px',
    },
    oldPrice: {
      textDecoration: 'line-through',
      color: '#bbb',
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
      gap: '10px',
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

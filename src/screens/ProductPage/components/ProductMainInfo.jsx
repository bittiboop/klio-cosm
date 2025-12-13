import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../../features/AuthContext';
import { useNotification } from '../../../features/NotificationContext';
import { addToFavorites, removeFromFavorites } from '../../../features/favorites/favoritesSlice';
import { addToCart } from '../../../features/cart/cartSlice';
import heartIcon from "../../../assets/img/icons-btn/heart-icon.png";
// eslint-disable-next-line no-unused-vars
import ProductList from '../../../assets/data/products.json';
import likedHeartIcon from "../../../assets/img/icons-btn/liked-heart-icon.png";

export default function ProductMainInfo({ProductList, productId}) {
    // eslint-disable-next-line no-unused-vars
    const [isLiked, setIsLiked] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [selectedImage, setSelectedImage] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const favoriteItems = useSelector(state => state.favorites.items);
    const { onAuthRequired } = useAuthContext();
    const { showNotification } = useNotification();

    const product = ProductList.products.find(p => p.id === productId);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if product is in favorites - must be called before early returns
    useEffect(() => {
        if (product) {
            const isFavorited = favoriteItems.some(item => item.id === product.id);
            setIsLiked(isFavorited);
        }
    }, [favoriteItems, product?.id]);
    
    if (!productId) {
        return <div>Loading...</div>;
    }
    
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

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            if (onAuthRequired) {
                onAuthRequired();
            }
            showNotification('Please log in to add items to your cart', 'warning');
            return;
        }
        dispatch(addToCart(product));
        showNotification(`${product.name} added to cart!`, 'success');
    };

    const handleLikeClick = () => {
        if (!isAuthenticated) {
            if (onAuthRequired) {
                onAuthRequired();
            }
            showNotification('Please log in to add items to your favorites', 'warning');
            return;
        }
        if (isLiked) {
            dispatch(removeFromFavorites(product.id));
            showNotification('Removed from favorites', 'success');
        } else {
            dispatch(addToFavorites(product));
            showNotification('Added to favorites', 'success');
        }
    };
    
    return(
        <div style={styles.wrapper}>
            <div style={styles.breadcrumbs(isMobile)}>
                <Link to="/" style={styles.breadcrumbLink}>All products</Link>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>{categoryName}</span>
            </div>

            <div style={styles.container(isMobile)}>
                <div style={styles.imageSection(isMobile)}>
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

                
                <div style={styles.infoSection(isMobile)}>
                    <h1 style={styles.title(isMobile)}>{product.name}</h1>
            
                    <div style={styles.metaInfo(isMobile)}>
                        <span style={styles.weight}>{product.weight || '9.0'} gramm</span>
                        {product.subtitle && 
                            <span style={styles.shadeTag}>
                                <span style={styles.shadeDot}>●</span> {product.subtitle}
                            </span>
                        }
                    </div>

                    <p style={styles.description(isMobile)}>
                        {product.description || "The Clio Kill Cover Cushion is your go-to for a flawless finish..."}
                    </p>

                    <div style={styles.priceBlock(isMobile)}>
                        {product.originalPrice && (
                            <span style={styles.oldPrice}>{product.originalPrice}{product.currency}</span>
                        )}
                        <span style={styles.currentPrice}>{product.price}{product.currency}</span>
                    </div>

                    <div style={styles.actions(isMobile)}>
                        <button style={styles.addToCartBtn} onClick={handleAddToCart}>Add to cart</button>
                        <button style={styles.wishlistBtn} onClick={handleLikeClick}>
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
    breadcrumbs: (isMobile) => ({
        fontSize: isMobile ? '12px' : '14px',
        color: '#666',
        marginBottom: isMobile ? '20px' : '30px',
        fontFamily: 'RegularFont',
        textAlign: 'left',
        paddingLeft: isMobile ? '15px' : '0',
        paddingRight: isMobile ? '15px' : '0',
    }),
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
    container: (isMobile) => ({
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '20px' : '50px',
      padding: isMobile ? '15px' : '20px 0',
      alignItems: isMobile ? 'stretch' : 'flex-start',
    }),
    imageSection: (isMobile) => ({
      flex: isMobile ? '1' : '0 0 40%',
      width: isMobile ? '100%' : 'auto',
    }),
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
      maxWidth: 'auto',
      height: 'auto',
      maxHeight: '350px',
      objectFit: 'contain',
      width: 'auto',
    },
    infoSection: (isMobile) => ({
      flex: isMobile ? '1' : '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: isMobile ? '0px' : '10px',
      paddingLeft: isMobile ? '15px' : '0',
      paddingRight: isMobile ? '15px' : '0',
    }),
    title: (isMobile) => ({
      fontSize: isMobile ? '24px' : '32px',
      fontFamily: 'MediumFont, sans-serif',
      margin: '0 0 8px 0',
      color: '#1a1a1a',
      fontWeight: '600',
      lineHeight: '1.3',
    }),
    metaInfo: (isMobile) => ({
      marginBottom: isMobile ? '12px' : '16px',
      color: '#666',
      fontSize: isMobile ? '12px' : '14px',
      fontFamily: 'RegularFont, sans-serif',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    }),
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
    description: (isMobile) => ({
      lineHeight: '1.6',
      color: '#555',
      marginBottom: isMobile ? '16px' : '20px',
      fontSize: isMobile ? '13px' : '14px',
      fontFamily: 'RegularFont, sans-serif',
    }),
    priceBlock: (isMobile) => ({
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px',
      marginBottom: isMobile ? '16px' : '24px',
      paddingTop: '0px',
    }),
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
    actions: (isMobile) => ({
      display: 'flex',
      gap: isMobile ? '8px' : '12px',
      alignItems: 'center',
      marginBottom: '0px',
    }),
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

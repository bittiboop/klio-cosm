import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice';
import { useAuthContext } from '../features/AuthContext';
import { useNotification } from '../features/NotificationContext';
import heartIcon from "../assets/img/icons-btn/heart-icon.png";
import likedHeartIcon from "../assets/img/icons-btn/liked-heart-icon.png";

export default function ProductCard({ProductList}) {
    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const favoriteItems = useSelector(state => state.favorites.items);
    const { onAuthRequired } = useAuthContext();
    const { showNotification } = useNotification();

    // Check if product is in favorites
    useEffect(() => {
        const isFavorited = favoriteItems.some(item => item.id === ProductList.id);
        setIsLiked(isFavorited);
    }, [favoriteItems, ProductList.id]);

    if (!ProductList) {
        return <div>Loading...</div>;
    }

    
    let imageUrl = ProductList.image;
    try {
        imageUrl = require(`../${ProductList.image}`);
    } catch (e) {
        console.log(`Image not found: ${ProductList.image}`);
    }

    const handleCardClick = () => {
        navigate(`/product/${ProductList.id}`);
    };

    const handleLikeClick = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            if (onAuthRequired) {
                onAuthRequired();
            }
            showNotification('Please log in to add items to your favorites', 'warning');
            return;
        }
        if (isLiked) {
            dispatch(removeFromFavorites(ProductList.id));
            showNotification('Removed from favorites', 'success');
        } else {
            dispatch(addToFavorites(ProductList));
            showNotification('Added to favorites', 'success');
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            if (onAuthRequired) {
                onAuthRequired();
            }
            showNotification('Please log in to add items to your cart', 'warning');
            return;
        }
        dispatch(addToCart(ProductList));
        showNotification(`${ProductList.name} added to cart!`, 'success');
    };
    
    return (
        <div style={styles.cardWrapper}>
            <div style={styles.card(isMobile)} onClick={handleCardClick}>
                <div style={styles.imageContainer(isMobile)}>
                    <img src={imageUrl} alt={ProductList.name} style={styles.image(isMobile)} />
                    <div style={styles.dotsContainer}>
                        <span style={{...styles.dot, ...styles.dotActive}}></span>
                        <span style={styles.dot}></span>
                    </div>
                </div>

                <div style={styles.infoContainer}>
                    <div style={styles.headerRow}>
                        <h3 style={styles.title(isMobile)}>{ProductList.name}</h3>
                        <button onClick={handleLikeClick} style={styles.likeButton}>
                            <img src={isLiked ? likedHeartIcon : heartIcon} alt="like icon" />
                        </button>
                    </div>
                    <div style={styles.priceSection}>
                        {ProductList.originalPrice && (
                            <span style={styles.oldPrice(isMobile)}>{ProductList.originalPrice}{ProductList.currency}</span>
                        )}
                        <p style={styles.price(isMobile)}>{ProductList.price}{ProductList.currency}</p>
                    </div>
                    <p style={styles.description(isMobile)}>{ProductList.description}</p>

                    <button
                    onClick={handleAddToCart}
                    style={styles.addToCartBtn(isMobile)}
                    onMouseOver={(e)=> e.target.style.backgroundColor = '#F1C3C3'}
                    onMouseOut={(e)=> e.target.style.backgroundColor = '#FFBCBC'}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    cardWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: (isMobile) => ({
        width: isMobile ? '160px' : '280px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: isMobile ? '10px' : '18px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
    }),
    imageContainer: (isMobile) => ({
        width: 'auto',
        height: isMobile ? '140px' : '260px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '6px',
        marginBottom: isMobile ? '10px' : '18px',
    }),
    image: (isMobile) => ({
        maxWidth: isMobile ? '120px' : '220px',
        maxHeight: isMobile ? '120px' : '220px',
        objectFit: 'contain',
    }),
    dotsContainer: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '6px',
    },
    dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
    },
    dotActive: {
        backgroundColor: '#999',
    },
    infoContainer: {
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        textAlign: 'left',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px',
    },
    title: (isMobile) => ({
        fontSize: isMobile ? '12px' : '16px',
        fontWeight: '400',
        margin: 0,
        color: '#000',
        flex: 1,
    }),
    likeButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '12px',
        height: '24px',
    },
    price: (isMobile) => ({
        fontSize: isMobile ? '12px' : '14px',
        fontWeight: '600',
        margin: '0',
        color: '#000',
    }),
    priceSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0',
    },
    oldPrice: (isMobile) => ({
        textDecoration: 'line-through',
        color: '#999',
        fontSize: isMobile ? '10px' : '12px',
        fontFamily: 'RegularFont',
        margin: '0',
    }),
    description: (isMobile) => ({
        fontSize: isMobile ? '10px' : '12px',
        margin: '0',
        lineHeight: '1.4',
        color: '#666',
    }),
    addToCartBtn: (isMobile) => ({
        backgroundColor: '#FFBCBC',
        border: 'none',
        fontSize: isMobile ? '14px' : '20px',
        padding: isMobile ? '8px 10px' : '10px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#000',
        fontFamily: 'MediumFont',
        marginTop: '8px',
    })
}
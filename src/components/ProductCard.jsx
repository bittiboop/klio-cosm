import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heartIcon from "../assets/img/icons-btn/heart-icon.png";
import ProductList from "../assets/data/products.json";
import likedHeartIcon from "../assets/img/icons-btn/liked-heart-icon.png";

export default function ProductCard({ProductList}) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

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
        setIsLiked(!isLiked);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        // Add to cart logic here
    };
    
    return (
        <div style={styles.cardWrapper}>
            <div style={styles.card} onClick={handleCardClick}>
                <div style={styles.imageContainer}>
                    <img src={imageUrl} alt={ProductList.name} style={styles.image} />
                    <div style={styles.dotsContainer}>
                        <span style={{...styles.dot, ...styles.dotActive}}></span>
                        <span style={styles.dot}></span>
                    </div>
                </div>

                <div style={styles.infoContainer}>
                    <div style={styles.headerRow}>
                        <h3 style={styles.title}>{ProductList.name}</h3>
                        <button onClick={handleLikeClick} style={styles.likeButton}>
                            <img src={isLiked ? likedHeartIcon : heartIcon} alt="like icon" />
                        </button>
                    </div>
                    <p style={styles.price}>{ProductList.price}{ProductList.currency}</p>
                    <p style={styles.description}>{ProductList.description}</p>
                    
                    {isLiked && <p>Is in your liked products: {ProductList.name}</p>}

                    <button
                    onClick={handleAddToCart}
                    style={styles.addToCartBtn}
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
    card: {
        width: '280px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
    },
    imageContainer: {
        width: '100%',
        height: '260px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '6px',
        marginBottom: '18px',
    },
    image: {
        maxWidth: '85%',
        maxHeight: '85%',
        objectFit: 'contain',
    },
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
    title: {
        fontSize: '16px',
        fontWeight: '400',
        margin: 0,
        color: '#000',
        flex: 1,
    },
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
    price: {
        fontSize: '14px',
        fontWeight: '600',
        margin: '0',
        color: '#000',
    },
    description: {
        fontSize: '12px',
        margin: '0',
        lineHeight: '1.4',
        color: '#666',
    },
    addToCartBtn: {
        backgroundColor: '#FFBCBC',
        border: 'none',
        fontSize: '20px',
        padding: '10px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#000',
        fontFamily: 'MediumFont',
        marginTop: '8px',
    }
}
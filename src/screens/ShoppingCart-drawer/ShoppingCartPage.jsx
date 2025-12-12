import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import ShoppingList from './components/ShoopingList';
import PromoCode from './components/PromoCode';
import CheckOut from './components/CheckOut';
import RelatedProducts from '../../components/RelatedProducts';
import { clearCart } from '../../features/cart/cartSlice';
import ProductList from '../../assets/data/products.json';
import shareIcon from '../../assets/img/cart-icons/share-icon.png';
import clearCartIcon from '../../assets/img/cart-icons/clear-cart-icon.png';
import closeCartIcon from '../../assets/img/cart-icons/close-cart-icon.png';

export default function ShoppingCartPage({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    if (!isOpen) return null;

    const handleEdit = () => {
        console.log('Edit cart');
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            dispatch(clearCart());
        }
    };

    const handleAddToRecommended = (product) => {
        dispatch(addToCart(product));
    };

    // Get related products (suggest other products)
    const relatedProducts = ProductList.products.slice(0, 6);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>Shopping cart</h2>
                    <div style={styles.actions}>
                        <button
                            onClick={handleEdit}
                            style={styles.iconBtn}
                            title="Share cart"
                        >
                            <img src={shareIcon} alt="share" style={styles.iconImg} />
                        </button>
                        <button
                            onClick={handleClearCart}
                            style={styles.iconBtn}
                            title="Clear cart"
                        >
                            <img src={clearCartIcon} alt="clear cart" style={styles.iconImg} />
                        </button>
                        <button
                            onClick={onClose}
                            style={styles.iconBtn}
                            title="Close cart"
                        >
                            <img src={closeCartIcon} alt="close cart" style={styles.iconImg} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div style={styles.content}>
                    {/* Shopping List */}
                    <ShoppingList />

                    {/* Promo Code */}
                    <PromoCode />

                    {/* Checkout Section */}
                    <CheckOut />

                    {/* Might be Interesting Section */}
                    {relatedProducts.length > 0 && (
                        <div style={styles.recommendedSection}>
                            <h3 style={styles.recommendedTitle}>Might be interesting...</h3>
                            <div style={styles.recommendedGrid}>
                                {relatedProducts.map((product) => (
                                    <div key={product.id} style={styles.recommendedCard}>
                                        <div style={styles.recommendedImageContainer}>
                                            <img
                                                src={require(`../../${product.image}`)}
                                                alt={product.name}
                                                style={styles.recommendedImage}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/120?text=No+Image';
                                                }}
                                            />
                                        </div>
                                        <p style={styles.recommendedName}>{product.name}</p>
                                        <p style={styles.recommendedDesc}>{product.description}</p>
                                        <div style={styles.recommendedPriceSection}>
                                            {product.originalPrice && (
                                                <span style={styles.recommendedOldPrice}>
                                                    {product.originalPrice}
                                                </span>
                                            )}
                                            <span style={styles.recommendedPrice}>
                                                {product.price}{product.currency}
                                            </span>
                                        </div>
                                        <button 
                                            style={styles.addToCartBtn}
                                            onClick={() => handleAddToRecommended(product)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1500,
        animation: 'fadeIn 0.3s ease-out',
    },
    drawer: {
        backgroundColor: '#fff',
        width: '450px',
        maxWidth: '450px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
        animation: 'slideInRight 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        flexShrink: 0,
    },
    title: {
        fontSize: '20px',
        fontWeight: '600',
        margin: 0,
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    iconBtn: {
        width: '32px',
        height: '32px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s ease',
    },
    iconImg: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    recommendedSection: {
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0',
    },
    recommendedTitle: {
        fontSize: '16px',
        fontWeight: '600',
        margin: '0 0 16px 0',
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    recommendedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
    },
    recommendedCard: {
        textAlign: 'center',
        padding: '12px',
        border: '1px solid #f0f0f0',
        borderRadius: '6px',
        backgroundColor: '#fafafa',
    },
    recommendedImageContainer: {
        width: 'auto',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: '4px',
        marginBottom: '8px',
    },
    recommendedImage: {
        maxWidth: '110px',
        maxHeight: '110px',
        objectFit: 'contain',
    },
    recommendedName: {
        fontSize: '12px',
        fontWeight: '600',
        margin: '0 0 4px 0',
        color: '#000',
        fontFamily: 'RegularFont, sans-serif',
    },
    recommendedDesc: {
        fontSize: '11px',
        color: '#999',
        margin: '0 0 8px 0',
        lineHeight: '1.3',
        fontFamily: 'RegularFont, sans-serif',
    },
    recommendedPriceSection: {
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        alignItems: 'center',
        marginBottom: '8px',
    },
    recommendedOldPrice: {
        fontSize: '11px',
        textDecoration: 'line-through',
        color: '#bbb',
        fontFamily: 'RegularFont, sans-serif',
    },
    recommendedPrice: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    addToCartBtn: {
        width: '100%',
        padding: '8px',
        backgroundColor: '#FFBCBC',
        border: 'none',
        borderRadius: '4px',
        color: '#000',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        fontFamily: 'MediumFont, sans-serif',
    },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
if (document.head) {
    document.head.appendChild(styleSheet);
}

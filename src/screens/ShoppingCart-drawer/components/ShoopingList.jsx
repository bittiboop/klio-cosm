import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../features/cart/cartSlice';

export default function ShoppingList() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    if (items.length === 0) {
        return (
            <div style={styles.emptyCart}>
                <p>Your cart is empty</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {items.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                    <div style={styles.imageSection}>
                        <img
                            src={require(`../../../${item.image}`)}
                            alt={item.name}
                            style={styles.productImage}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                            }}
                        />
                    </div>
                    <div style={styles.infoSection}>
                        <h3 style={styles.productName}>{item.name}</h3>
                        <p style={styles.description}>{item.description}</p>
                        <div style={styles.priceSection}>
                            {item.originalPrice && (
                                <span style={styles.oldPrice}>
                                    {item.originalPrice}{item.currency}
                                </span>
                            )}
                            <span style={styles.currentPrice}>
                                {item.price}{item.currency}
                            </span>
                        </div>
                    </div>
                    <div style={styles.quantitySection}>
                        <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            style={styles.quantityBtn}
                        >
                            −
                        </button>
                        <span style={styles.quantity}>{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            style={styles.quantityBtn}
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => handleRemove(item.id)}
                        style={styles.deleteBtn}
                        title="Remove from cart"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '20px',
        maxHeight: '400px',
        overflowY: 'auto',
    },
    emptyCart: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#999',
        fontSize: '14px',
    },
    cartItem: {
        display: 'flex',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        alignItems: 'flex-start',
    },
    imageSection: {
        flexShrink: 0,
    },
    productImage: {
        width: '80px',
        height: '80px',
        objectFit: 'contain',
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '4px',
    },
    infoSection: {
        flex: 1,
        minWidth: 0,
    },
    productName: {
        fontSize: '14px',
        fontWeight: '600',
        margin: '0 0 4px 0',
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    description: {
        fontSize: '12px',
        color: '#666',
        margin: '0 0 8px 0',
        lineHeight: '1.4',
        fontFamily: 'RegularFont, sans-serif',
    },
    priceSection: {
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
    },
    oldPrice: {
        textDecoration: 'line-through',
        color: '#999',
        fontSize: '12px',
        fontFamily: 'RegularFont, sans-serif',
    },
    currentPrice: {
        fontWeight: '600',
        color: '#000',
        fontSize: '13px',
        fontFamily: 'MediumFont, sans-serif',
    },
    quantitySection: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
    },
    quantityBtn: {
        width: '24px',
        height: '24px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        borderRadius: '3px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s ease',
        fontFamily: 'RegularFont, sans-serif',
    },
    quantity: {
        minWidth: '20px',
        textAlign: 'center',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
    },
    deleteBtn: {
        width: '24px',
        height: '24px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#999',
        transition: 'color 0.2s ease',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
};

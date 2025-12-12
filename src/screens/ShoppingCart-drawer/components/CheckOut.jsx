import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../../features/cart/cartSlice';
import { addPurchase } from '../../../features/purchases/purchasesSlice';
import { useNotification } from '../../../features/NotificationContext';

export default function CheckOut() {
    const dispatch = useDispatch();
    const { showNotification } = useNotification();
    const items = useSelector(state => state.cart.items);
    const discountAmount = useSelector(state => state.cart.discountAmount);

    const subtotal = items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    const total = subtotal - discountAmount;

    const handlePurchase = () => {
        if (items.length === 0) {
            showNotification('Your cart is empty', 'warning');
            return;
        }
        
        // Add purchase to history
        dispatch(addPurchase({
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            subtotal,
            discountAmount,
            total,
        }));
        
        dispatch(clearCart());
        showNotification(`Purchase complete! Total: ${total.toLocaleString()}₩`, 'success');
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Check out</h3>
            
            <div style={styles.row}>
                <span style={styles.label}>Cost</span>
                <span style={styles.value}>{subtotal.toLocaleString()}₩</span>
            </div>

            {discountAmount > 0 && (
                <div style={styles.row}>
                    <span style={styles.label}>Discount</span>
                    <span style={styles.discount}>-{discountAmount.toLocaleString()}₩</span>
                </div>
            )}

            <div style={styles.divider}></div>

            <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>{total.toLocaleString()}₩</span>
            </div>

            <button
                onClick={handlePurchase}
                style={styles.purchaseBtn}
                disabled={items.length === 0}
            >
                Purchase
            </button>
        </div>
    );
}

const styles = {
    container: {
        padding: '16px 0',
        borderTop: '1px solid #e0e0e0',
    },
    title: {
        fontSize: '16px',
        fontWeight: '600',
        margin: '0 0 12px 0',
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '14px',
    },
    label: {
        color: '#666',
        fontFamily: 'RegularFont, sans-serif',
    },
    value: {
        color: '#000',
        fontFamily: 'RegularFont, sans-serif',
    },
    discount: {
        color: '#2e7d32',
        fontWeight: '600',
        fontFamily: 'RegularFont, sans-serif',
    },
    divider: {
        height: '1px',
        backgroundColor: '#e0e0e0',
        margin: '12px 0',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    totalLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    totalValue: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#000',
        fontFamily: 'SemiBoldFont, sans-serif',
    },
    purchaseBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#FFBCBC',
        border: 'none',
        borderRadius: '4px',
        color: '#000',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        fontFamily: 'MediumFont, sans-serif',
    },
};

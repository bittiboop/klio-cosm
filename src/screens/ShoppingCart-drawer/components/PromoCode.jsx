import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyPromoCode, clearPromoCode } from '../../../features/cart/cartSlice';

export default function PromoCode() {
    const [code, setCode] = useState('');
    const [appliedCode, setAppliedCode] = useState(null);
    const dispatch = useDispatch();

    const promoCodes = {
        'SAVE10': 10,
        'WELCOME20': 20,
        'SUMMER15': 15,
    };

    const handleApply = () => {
        if (code.trim() && promoCodes[code.toUpperCase()]) {
            const discount = promoCodes[code.toUpperCase()];
            dispatch(applyPromoCode({ code: code.toUpperCase(), discount }));
            setAppliedCode(code.toUpperCase());
            setCode('');
        } else {
            alert('Invalid promo code');
            setCode('');
        }
    };

    const handleRemove = () => {
        dispatch(clearPromoCode());
        setAppliedCode(null);
    };

    return (
        <div style={styles.container}>
            <label style={styles.label}>Promo code</label>
            {appliedCode ? (
                <div style={styles.appliedCode}>
                    <span style={styles.codeText}>✓ {appliedCode} applied</span>
                    <button onClick={handleRemove} style={styles.removeBtn}>
                        Remove
                    </button>
                </div>
            ) : (
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApply()}
                        placeholder="Enter code"
                        style={styles.input}
                    />
                    <button onClick={handleApply} style={styles.applyBtn}>
                        Apply
                    </button>
                </div>
            )}
            <p style={styles.hint}>Available codes: SAVE10, WELCOME20, SUMMER15</p>
        </div>
    );
}

const styles = {
    container: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#000',
        fontFamily: 'RegularFont, sans-serif',
    },
    inputContainer: {
        display: 'flex',
        gap: '8px',
    },
    input: {
        flex: 1,
        padding: '10px 12px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
        outline: 'none',
    },
    applyBtn: {
        padding: '10px 20px',
        backgroundColor: '#FFBCBC',
        border: 'none',
        borderRadius: '4px',
        color: '#000',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        fontFamily: 'MediumFont, sans-serif',
    },
    appliedCode: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: '#e8f5e9',
        borderRadius: '4px',
        border: '1px solid #c8e6c9',
    },
    codeText: {
        color: '#2e7d32',
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'RegularFont, sans-serif',
    },
    removeBtn: {
        background: 'none',
        border: 'none',
        color: '#2e7d32',
        cursor: 'pointer',
        fontSize: '12px',
        textDecoration: 'underline',
        fontFamily: 'RegularFont, sans-serif',
    },
    hint: {
        fontSize: '12px',
        color: '#999',
        margin: '8px 0 0 0',
        fontFamily: 'RegularFont, sans-serif',
    },
};

import React from 'react'

export default function Subscribe() {

    return(
        <div style={styles.wrapper}>
            <div style={styles.subscribeContainer}>
                <h2 style={styles.subscribeTitle}>Subscribe to our Newsletter</h2>
                <p style={styles.subscribeSubtitle}>
                    Get a 20% Off Coupon on Your First Order!
                </p>
                <form style={styles.formContainer}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={styles.emailInput}
                    />
                    <button type="submit" style={styles.subscribeButton}>
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    },
    subscribeContainer: {
        padding: '60px 20px',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        boxSizing: 'border-box',
    },
    subscribeTitle: {
        fontSize: '28px',
        fontWeight: '400',
        marginBottom: '10px',
        color: '#000',
    },
    subscribeSubtitle: {
        fontSize: '14px',
        fontWeight: '400',
        marginBottom: '30px',
        color: '#666',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
        flexWrap: 'wrap',
    },
    emailInput: {
        height: '50px',
        flex: 1,
        minWidth: '200px',
        padding: '10px 15px',
        fontSize: '14px',
        backgroundColor: '#d9d9d9',
        border: 'none',
        borderRadius: '4px',
        fontFamily: 'RegularFont',
        boxSizing: 'border-box',
    },
    subscribeButton: {
        height: '50px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: '#FFBCBC',
        border: 'none',
        borderRadius: '4px',
        color: '#000',
        fontSize: '25px',
        fontFamily: 'MediumFont',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    }
}

// Media query styles for mobile
const mediaStyles = `
@media (max-width: 768px) {
    .subscribe-container {
        padding: 40px 16px !important;
    }
    
    .subscribe-title {
        font-size: 22px !important;
        margin-bottom: 8px !important;
    }
    
    .subscribe-subtitle {
        font-size: 12px !important;
        margin-bottom: 20px !important;
    }
    
    .form-container {
        gap: 8px !important;
    }
    
    .email-input {
        height: 40px !important;
        font-size: 12px !important;
    }
    
    .subscribe-button {
        height: 40px !important;
        font-size: 16px !important;
        padding: 0 16px !important;
    }
}

@media (max-width: 480px) {
    .subscribe-container {
        padding: 30px 12px !important;
    }
    
    .subscribe-title {
        font-size: 18px !important;
        margin-bottom: 6px !important;
    }
    
    .subscribe-subtitle {
        font-size: 11px !important;
        margin-bottom: 16px !important;
    }
    
    .form-container {
        flex-direction: column !important;
        gap: 10px !important;
        width: 100% !important;
    }
    
    .email-input {
        width: 100% !important;
        height: 36px !important;
        font-size: 12px !important;
    }
    
    .subscribe-button {
        width: 100% !important;
        height: 36px !important;
        font-size: 14px !important;
    }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = mediaStyles;
    document.head.appendChild(style);
}
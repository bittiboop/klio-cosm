import React from 'react'

export default function Subscribe() {

    return(
        <div>
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
    subscribeContainer: {
        padding: '60px 20px',
        alignItems: 'center',
        textAlign: 'center',
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
    },
    emailInput: {
        height: '30px',
        flex: 1,
        padding: '10px 15px',
        fontSize: '14px',
        backgroundColor: '#d9d9d9',
        border: 'none',
        borderRadius: '4px',
        fontFamily: 'RegularFont',
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
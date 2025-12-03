import React from 'react'

export default function Subscribe() {

    return(
        <>
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
        </>
    )
}

const styles = {
    subscribeContainer:{
        paddingVertical: '40px',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '14px',
    },
    subscribeTitle:{
        fontSize: '40px',
        fontFamily: 'MediumFont',
        marginBottom: '10px',
    },
    subscribeSubtitle:{
        fontSize: '25px',
        fontFamily: 'RegularFont',
    },
    formContainer:{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
    },
    emailInput:{
        minHeight: '50px',
        width: '70%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#d9d9d9',
        border: 'none',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    subscribeButton:{
        minHeight: '50px',
        width: '25%',
        backgroundColor: '#FFBCBC',
        border: 'none',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color : '#000',
        fontFamily: 'MediumFont',
        fontSize: '25px',
        cursor: 'pointer',
    }
}
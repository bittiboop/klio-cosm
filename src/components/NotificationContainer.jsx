import React from 'react';
import { useNotification } from '../features/NotificationContext';

export default function NotificationContainer() {
    const { notifications, removeNotification } = useNotification();

    return (
        <div style={styles.container}>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    style={{
                        ...styles.notification,
                        ...styles[notification.type],
                    }}
                >
                    <div style={styles.contentWrapper}>
                        <span style={styles.icon}>
                            {notification.type === 'success' && '✓'}
                            {notification.type === 'error' && '✕'}
                            {notification.type === 'warning' && '!'}
                            {notification.type === 'info' && 'ℹ'}
                        </span>
                        <p style={styles.message}>{notification.message}</p>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        style={styles.closeBtn}
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
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
    },
    notification: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontFamily: 'RegularFont, sans-serif',
        animation: 'slideIn 0.3s ease-out',
        backdropFilter: 'blur(10px)',
    },
    contentWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
    },
    icon: {
        fontSize: '18px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '24px',
    },
    message: {
        margin: 0,
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.4',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px',
        marginLeft: '12px',
        opacity: 0.7,
        transition: 'opacity 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        backgroundColor: '#E8F5E9',
        color: '#2E7D32',
        borderLeft: '4px solid #4CAF50',
    },
    error: {
        backgroundColor: '#FFEBEE',
        color: '#C62828',
        borderLeft: '4px solid #F44336',
    },
    warning: {
        backgroundColor: '#FFF3E0',
        color: '#E65100',
        borderLeft: '4px solid #FF9800',
    },
    info: {
        backgroundColor: '#E1F5FE',
        color: '#01579B',
        borderLeft: '4px solid #2196F3',
    },
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
if (document.head) {
    document.head.appendChild(style);
}

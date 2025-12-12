import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { clearFavorites } from '../../features/favorites/favoritesSlice';
import { clearPurchases } from '../../features/purchases/purchasesSlice';
import { useNotification } from '../../features/NotificationContext';
import ProductCard from '../../components/ProductCard';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { showNotification } = useNotification();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const user = useSelector(state => state.auth.user);
    const favoriteItems = useSelector(state => state.favorites.items);
    const purchases = useSelector(state => state.purchases.purchases);

    if (!user) {
        return (
            <div style={styles.container}>
                <div style={styles.emptyState}>
                    <h2>Please log in to view your profile</h2>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        dispatch(logout());
        showNotification('Logged out successfully', 'success');
        navigate('/');
    };

    const handleClearFavorites = () => {
        if (window.confirm('Are you sure you want to clear all favorites?')) {
            dispatch(clearFavorites());
            showNotification('Favorites cleared', 'success');
        }
    };

    const handleClearPurchases = () => {
        if (window.confirm('Are you sure you want to clear purchase history?')) {
            dispatch(clearPurchases());
            showNotification('Purchase history cleared', 'success');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                {/* Profile Header */}
                <div style={styles.profileHeader(isMobile)}>
                    <div style={styles.profileInfo(isMobile)}>
                        <div style={styles.avatar}>{user.email?.[0]?.toUpperCase()}</div>
                        <div style={styles.userDetails}>
                            <h1 style={styles.userName}>{user.email}</h1>
                            <p style={styles.memberSince}>Member since account creation</p>
                        </div>
                    </div>
                    <button style={styles.logoutBtn(isMobile)} onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Account Info */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Account Information</h2>
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <p style={styles.infoLabel}>Email</p>
                            <p style={styles.infoValue}>{user.email}</p>
                        </div>
                        <div style={styles.infoItem}>
                            <p style={styles.infoLabel}>Total Favorites</p>
                            <p style={styles.infoValue}>{favoriteItems.length}</p>
                        </div>
                    </div>
                </div>

                {/* Liked Products Section */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>My Favorite Products ({favoriteItems.length})</h2>
                        {favoriteItems.length > 0 && (
                            <button style={styles.clearBtn} onClick={handleClearFavorites}>
                                Clear All
                            </button>
                        )}
                    </div>

                    {favoriteItems.length === 0 ? (
                        <div style={styles.emptyFavorites}>
                            <p>You haven't added any favorites yet</p>
                            <button 
                                style={styles.browseBtn}
                                onClick={() => navigate('/all-products')}
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div style={styles.favoritesGrid(isMobile)}>
                            {favoriteItems.map((product) => (
                                <ProductCard key={product.id} ProductList={product} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Latest Purchases Section */}
                <div style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Latest Purchases ({purchases.length})</h2>
                        {purchases.length > 0 && (
                            <button style={styles.clearBtn} onClick={handleClearPurchases}>
                                Clear History
                            </button>
                        )}
                    </div>

                    {purchases.length === 0 ? (
                        <div style={styles.emptyPurchases}>
                            <p>No purchase history yet</p>
                            <button 
                                style={styles.browseBtn}
                                onClick={() => navigate('/all-products')}
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={styles.purchasesList}>
                            {purchases.map((purchase) => (
                                <div key={purchase.id} style={styles.purchaseCard}>
                                    <div style={styles.purchaseHeader}>
                                        <p style={styles.purchaseDate}>{purchase.date}</p>
                                        <p style={styles.purchaseTotal}>{purchase.total.toLocaleString()}₩</p>
                                    </div>
                                    <div style={styles.purchaseItems}>
                                        <p style={styles.itemCount}>{purchase.items.length} item{purchase.items.length !== 1 ? 's' : ''}</p>
                                        <div style={styles.itemsList}>
                                            {purchase.items.map((item) => (
                                                <span key={item.id} style={styles.itemBadge}>
                                                    {item.name} x{item.quantity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        minHeight: '100vh',
        paddingBottom: '60px',
        paddingTop: '60px',
    },
    wrapper: {
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '60px 20px',
    },
    profileHeader: (isMobile) => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'center' : 'flex-start',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        marginBottom: '40px',
        borderBottom: '3px solid #FFBCBC',
        gap: isMobile ? '20px' : '0',
    }),
    profileInfo: (isMobile) => ({
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '15px' : '20px',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'flex-start',
    }),
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#FFBCBC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        fontWeight: '600',
        color: '#fff',
        fontFamily: 'MediumFont, sans-serif',
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    userName: {
        fontSize: '24px',
        fontWeight: '600',
        margin: 0,
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    memberSince: {
        fontSize: '14px',
        color: '#999',
        margin: 0,
        fontFamily: 'RegularFont, sans-serif',
    },
    logoutBtn: (isMobile) => ({
        padding: isMobile ? '10px 24px' : '12px 28px',
        backgroundColor: '#FFBCBC',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        fontSize: isMobile ? '12px' : '14px',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: 'MediumFont, sans-serif',
        transition: 'background-color 0.2s ease',
        width: isMobile ? '100%' : 'auto',
    }),
    section: {
        marginBottom: '40px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    sectionTitle: {
        fontSize: '22px',
        fontWeight: '600',
        margin: 0,
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    clearBtn: {
        padding: '8px 16px',
        backgroundColor: '#FFE5E5',
        color: '#C62828',
        border: '1px solid #FFB3B3',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: 'RegularFont, sans-serif',
        transition: 'background-color 0.2s ease',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    infoItem: {
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #e0e0e0',
    },
    infoLabel: {
        fontSize: '12px',
        color: '#999',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        fontFamily: 'RegularFont, sans-serif',
    },
    infoValue: {
        fontSize: '16px',
        fontWeight: '600',
        margin: 0,
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    emptyFavorites: {
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    emptyPurchases: {
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    emptyState: {
        padding: '100px 20px',
        textAlign: 'center',
    },
    favoritesGrid: (isMobile) => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '15px' : '30px',
        justifyItems: 'center',
    }),
    browseBtn: {
        marginTop: '20px',
        padding: '12px 32px',
        backgroundColor: '#FFBCBC',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: 'MediumFont, sans-serif',
        transition: 'background-color 0.2s ease',
    },
    purchasesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    purchaseCard: {
        padding: '16px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
    },
    purchaseHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #e0e0e0',
    },
    purchaseDate: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#000',
        margin: 0,
        fontFamily: 'MediumFont, sans-serif',
    },
    purchaseTotal: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#FFBCBC',
        margin: 0,
        fontFamily: 'SemiBoldFont, sans-serif',
    },
    purchaseItems: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    itemCount: {
        fontSize: '12px',
        color: '#999',
        margin: 0,
        fontFamily: 'RegularFont, sans-serif',
    },
    itemsList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    },
    itemBadge: {
        padding: '4px 12px',
        backgroundColor: '#fff',
        border: '1px solid #FFBCBC',
        borderRadius: '16px',
        fontSize: '12px',
        color: '#000',
        fontFamily: 'RegularFont, sans-serif',
    },
};

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, registerSuccess, setError, clearError, setLoading } from '../../features/auth/authSlice';
import { loginUser, registerUser } from '../../features/auth/authUtils';
import hideIcon from '../../assets/img/icons-btn/hide.svg';
import showIcon from '../../assets/img/icons-btn/show.svg';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();
    const { isLoading, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        
        try {
            const user = await loginUser(formData.email, formData.password);
            dispatch(loginSuccess(user));
            setFormData({ email: '', password: '', name: '', confirmPassword: '' });
            onClose();
        } catch (err) {
            dispatch(setError(err.toString ? err.toString() : String(err)));
            dispatch(setLoading(false));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        
        try {
            const user = await registerUser(
                formData.name,
                formData.email,
                formData.password,
                formData.confirmPassword
            );
            dispatch(registerSuccess(user));
            setFormData({ email: '', password: '', name: '', confirmPassword: '' });
            onClose();
        } catch (err) {
            dispatch(setError(err.toString ? err.toString() : String(err)));
            dispatch(setLoading(false));
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={onClose}>✕</button>
                <h3 style={styles.header}>{activeTab === 'login' ? 'Login to Your Account' : 'Create a New Account'}</h3>
                <div style={styles.tabsContainer}>
                    <button
                        onClick={() => setActiveTab('login')}
                        style={activeTab === 'login' ? styles.tabActive : styles.tab}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        style={activeTab === 'register' ? styles.tabActive : styles.tab}
                    >
                        Register
                    </button>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                {activeTab === 'login' ? (
                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.passwordInputContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="At least 6 characters"
                                    style={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.toggleBtn}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    <img 
                                        src={showPassword ? hideIcon : showIcon} 
                                        alt={showPassword ? "Hide" : "Show"}
                                        style={styles.toggleIcon}
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={isLoading ? styles.submitBtnDisabled : styles.submitBtn}
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your name"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                style={styles.input}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password</label>
                            <div style={styles.passwordInputContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="At least 6 characters"
                                    style={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.toggleBtn}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    <img 
                                        src={showPassword ? hideIcon : showIcon} 
                                        alt={showPassword ? "Hide" : "Show"}
                                        style={styles.toggleIcon}
                                    />
                                </button>
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Confirm Password</label>
                            <div style={styles.passwordInputContainer}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                    style={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.toggleBtn}
                                    title={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    <img 
                                        src={showConfirmPassword ? hideIcon : showIcon} 
                                        alt={showConfirmPassword ? "Hide" : "Show"}
                                        style={styles.toggleIcon}
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={isLoading ? styles.submitBtnDisabled : styles.submitBtn}
                        >
                            {isLoading ? 'Loading...' : 'Register'}
                        </button>
                    </form>
                )}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        fontFamily: 'RegularFont, sans-serif',
    },
    closeBtn: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#999',
        transition: 'color 0.3s ease',
    },
    tabsContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        borderBottom: '2px solid #f0f0f0',
    },
    tab: {
        padding: '10px 20px',
        background: 'none',
        border: 'none',
        color: '#999',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderBottom: '3px solid transparent',
        marginBottom: '-2px',
        fontFamily: 'RegularFont, sans-serif',
    },
    tabActive: {
        padding: '10px 20px',
        background: 'none',
        border: 'none',
        color: '#000',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderBottom: '3px solid #FFBCBC',
        marginBottom: '-2px',
        fontFamily: 'RegularFont, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#333',
        fontFamily: 'RegularFont, sans-serif',
    },
    passwordInputContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        gap: '0',
    },
    input: {
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
        transition: 'border-color 0.3s ease',
        flex: 1,
    },
    toggleBtn: {
        position: 'absolute',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0 5px',
        transition: 'transform 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleIcon: {
        width: '20px',
        height: '20px',
        opacity: 0.7,
        transition: 'opacity 0.2s ease',
    },
    submitBtn: {
        padding: '12px',
        backgroundColor: '#FFBCBC',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontFamily: 'RegularFont, sans-serif',
        marginTop: '10px',
    },
    submitBtnDisabled: {
        padding: '12px',
        backgroundColor: '#e0e0e0',
        color: '#999',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'not-allowed',
        fontFamily: 'RegularFont, sans-serif',
        marginTop: '10px',
    },
    error: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '15px',
        fontSize: '14px',
        fontFamily: 'RegularFont',
    },
    header: {
        fontSize: '25px',
        fontWeight: '600',
        fontFamily: 'RegularFont',
        marginBottom: '25px',
    },
};
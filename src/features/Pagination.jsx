import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageClick = (page) => {
        onPageChange(page);
    };

    return (
        <div style={styles.paginationContainer}>
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                style={currentPage === 1 ? styles.buttonDisabled : styles.button}
            >
                ← Last
            </button>

            <div style={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        style={currentPage === page ? styles.pageButtonActive : styles.pageButton}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={currentPage === totalPages ? styles.buttonDisabled : styles.button}
            >
                Next →
            </button>
        </div>
    );
}

const styles = {
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        marginTop: '50px',
        marginBottom: '50px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#FFBCBC',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
        transition: 'background-color 0.3s ease',
    },
    buttonDisabled: {
        padding: '10px 20px',
        backgroundColor: '#ffe3e3ff',
        color: '#999',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
    },
    pageNumbers: {
        display: 'flex',
        gap: '8px',
    },
    pageButton: {
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        color: '#ffa3a3ff',
        border: '1px solid #ff8c8cff',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
        transition: 'all 0.3s ease',
    },
    pageButtonActive: {
        padding: '8px 12px',
        backgroundColor: '#FFBCBC',
        color: '#000',
        border: '1px solid #ff8c8cff',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'RegularFont, sans-serif',
    },
};

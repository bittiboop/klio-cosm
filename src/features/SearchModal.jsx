import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from './SearchContext';
import { searchProducts } from './searchUtils';

import './SearchModal.css';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useContext(SearchContext);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      setResults(searchProducts(value));
    } else {
      setResults([]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery('');
    setResults([]);
  };

  if (!isSearchOpen) return null;

  return (
    <div style={styles.overlay} onClick={closeSearch}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleSearch}
            style={styles.searchInput}
            autoFocus
          />
          <button style={styles.closeBtn} onClick={closeSearch}>✕</button>
        </div>

        <div style={styles.resultsContainer}>
          {query.trim() ? (
            results.length > 0 ? (
              <div style={styles.results}>
                <p style={styles.resultCount}>
                  Found {results.length} product{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    style={styles.resultItem}
                    onClick={closeSearch}
                  >
                    <img
                      src={require(`../${product.image}`)}
                      alt={product.name}
                      style={styles.resultImg}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <div style={styles.resultInfo}>
                      <p style={styles.resultName}>{product.name}</p>
                      <p style={styles.resultCategory}>{product.category}</p>
                      <p style={styles.resultPrice}>
                        {product.price}{product.currency}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={styles.noResults}>
                <p>No products found for "{query}"</p>
                <p style={styles.noResultsHint}>Try searching by name or category</p>
              </div>
            )
          ) : (
            <div style={styles.empty}>
              <p>Start typing to search...</p>
            </div>
          )}
        </div>
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
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '100px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '70vh',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontFamily: 'RegularFont, sans-serif',
    outline: 'none',
  },
  closeBtn: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    transition: 'all 0.3s ease',
  },
  resultsContainer: {
    overflowY: 'auto',
    flex: 1,
    padding: '20px',
  },
  results: {
    display: 'flex',
    flexDirection: 'column',
  },
  resultCount: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '15px',
    fontFamily: 'RegularFont, sans-serif',
  },
  resultItem: {
    display: 'flex',
    gap: '15px',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  resultImg: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '5px',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    margin: '0 0 4px 0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
    fontFamily: 'MediumFont, sans-serif',
  },
  resultCategory: {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#888',
    fontFamily: 'RegularFont, sans-serif',
  },
  resultPrice: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '600',
    color: '#FF9B9B',
    fontFamily: 'SemiBoldFont, sans-serif',
  },
  noResults: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  noResultsHint: {
    fontSize: '13px',
    color: '#999',
    margin: '8px 0 0 0',
  },
  empty: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999',
    fontFamily: 'RegularFont, sans-serif',
  },
};

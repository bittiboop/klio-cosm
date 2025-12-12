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
    <div className="search-overlay" style={styles.overlay} onClick={closeSearch}>
      <div className="search-modal" style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className="search-header" style={styles.header}>
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleSearch}
            style={styles.searchInput}
            autoFocus
          />
          <button className="close-btn" style={styles.closeBtn} onClick={closeSearch}>✕</button>
        </div>

        <div className="search-results-container" style={styles.resultsContainer}>
          {query.trim() ? (
            results.length > 0 ? (
              <div className="search-results" style={styles.results}>
                <p className="result-count" style={styles.resultCount}>
                  Found {results.length} product{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    className="result-item"
                    to={`/product/${product.id}`}
                    style={styles.resultItem}
                    onClick={closeSearch}
                  >
                    <img
                      className="result-img"
                      src={require(`../${product.image}`)}
                      alt={product.name}
                      style={styles.resultImg}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <div className="result-info" style={styles.resultInfo}>
                      <p className="result-name" style={styles.resultName}>{product.name}</p>
                      <p className="result-category" style={styles.resultCategory}>{product.category}</p>
                      <p className="result-price" style={styles.resultPrice}>
                        {product.price}{product.currency}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-results" style={styles.noResults}>
                <p>No products found for "{query}"</p>
                <p className="no-results-hint" style={styles.noResultsHint}>Try searching by name or category</p>
              </div>
            )
          ) : (
            <div className="empty" style={styles.empty}>
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
    width: '420px',
    maxWidth: '600px',
    maxHeight: '70vh',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontFamily: 'RegularFont, sans-serif',
    outline: 'none',
    height: '40px',
  },
  closeBtn: {
    padding: '12px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#999',
    transition: 'all 0.3s ease',
    height: '44px',
    width: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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

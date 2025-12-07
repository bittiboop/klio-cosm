import React from 'react';
import { useState } from 'react';

export default function ProductTabs({ productList }) {
  const [activeTab, setActiveTab] = useState('description');

  if (!productList) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'usage', label: 'Usage' },
    { id: 'formula', label: 'Formula' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'additional', label: 'Additional Information' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabBtn,
              ...(activeTab === tab.id ? styles.activeTabBtn : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'description' && (
          <div>
            <h3 style={styles.contentTitle}>{productList.name}</h3>
            <p style={styles.category}>{productList.category}</p>
            <p style={styles.paragraph}>{productList.detailedDescription || productList.description || "No description available."}</p>
          </div>
        )}
        {activeTab === 'usage' && (
          <div>
            <p style={styles.paragraph}>Apply gently using the provided puff. Blend evenly for best results.</p>
          </div>
        )}
        {activeTab === 'formula' && (
          <div>
            <p style={styles.paragraph}>Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin, and other premium ingredients.</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <p style={styles.paragraph}>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
        {activeTab === 'additional' && (
          <div>
            <p style={styles.paragraph}>Made in Korea. 100% Authentic Product.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '60px',
    fontFamily: 'RegularFont, sans-serif',
  },
  header: {
    display: 'flex',
    gap: '40px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '0',
    overflowX: 'auto',
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontFamily: 'RegularFont, sans-serif',
    cursor: 'pointer',
    color: '#999',
    padding: '12px 0',
    position: 'relative',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
    marginBottom: '-1px',
  },
  activeTabBtn: {
    color: '#000',
    fontWeight: '600',
    borderBottom: '2px solid #000',
  },
  content: {
    padding: '40px 0',
    lineHeight: '1.8',
    color: '#555',
    fontSize: '15px',
  },
  contentTitle: {
    fontSize: '18px',
    fontFamily: 'MediumFont, sans-serif',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  category: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '16px',
    fontFamily: 'RegularFont, sans-serif',
  },
  paragraph: {
    lineHeight: '1.8',
    color: '#555',
    margin: '0',
    fontFamily: 'RegularFont, sans-serif',
  },
};


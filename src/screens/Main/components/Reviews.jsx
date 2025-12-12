import React from 'react';
import ReviewList from '../../../assets/data/reviews.json'

const ReviewCard = ({title, text, rating}) => {
    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }
    
    const styles = {
        reviewCard: {
            backgroundColor: '#f4e0e0ff',
            padding: '24px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'RegularFont, sans-serif',
            margin: '0 0 20px 0',
            color: '#000',
        },
        text: {
            fontSize: '14px',
            fontFamily: 'RegularFont, sans-serif',
            lineHeight: '1.6',
            margin: '0 0 12px 0',
            color: '#333',
            flex: 1,
            textAlign: 'left',
        },
        stars: {
            fontSize: '25px',
            color: '#FFB800',
            margin: 0,
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'flex-start',
        }
    }

    return (
        <div style={styles.reviewCard}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.text}>{text}</p>
            <p style={styles.stars}>{renderStars(rating)}</p>
        </div>
    )
}

export default function Reviews() {
    const styles = {
        wrapper: {
            width: '100%',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        container: {
            maxWidth: '1120px',
            margin: '0 auto',
            padding: '60px 20px',
            width: '100%',
            boxSizing: 'border-box',
        },
        title: {
            fontSize: '32px',
            fontWeight: '400',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#000',
            fontFamily: 'RegularFont, sans-serif',
        },
        reviewsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            justifyItems: 'stretch',
        }
    }

    
    const displayedReviews = ReviewList.reviews.slice(0, 4);

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={styles.title}>Customer Reviews</h2>
                <div style={styles.reviewsGrid}>
                    {displayedReviews.map((review) => (
                        <ReviewCard 
                            key={review.id}
                            title={review.title}
                            text={review.text}
                            rating={review.rating}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
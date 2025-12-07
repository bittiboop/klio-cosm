import React from 'react';
import ReviewList from '../../../assets/data/reviews.json'

const ReviewCard = ({title,text,rating})=>{
    const renderStars =(rating)=>{
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }
    const styles ={
        reviewCard:{
            backgroundColor: '#f1c3c3',
            padding: '24px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
        },
        title:{
            fontSize: '25px',
            fontFamily: 'RegularFont',
        }
    }

    return(
        <div style={styles.reviewCard}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.text}>{text}</p>
            <p style={styles.stars}>{renderStars(rating)}</p>
        </div>
    )
}
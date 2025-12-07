import React from 'react';
import { useNavigate } from 'react-router-dom';

import MakeupCircle from '../assets/img/more-to-see/makeup-circle.png'
import SkincareCircle from '../assets/img/more-to-see/skincare-circle.png'
import BeautyToolsCircle from '../assets/img/more-to-see/beauty-tools-circle.png'
import BodycareCircle from '../assets/img/more-to-see/bodycare-circle.png'
import GiftCardsCircle from '../assets/img/more-to-see/gift-cards-circle.png'


export default function MoreToSee() {
    const navigate = useNavigate();
    
    const handleNavigate = (path) => {
        navigate(path);
    }
    
    return(
        <div>
            <div style={styles.moreToSeeContainer}>
                <h2 style={styles.title}>More to See</h2>
                <div style={styles.circlesContainer}>
                    <div style={styles.circleButton} onClick={() => handleNavigate('/palettes')}>
                        <img style={styles.circleImage} src={MakeupCircle} alt="Makeup" />
                        <p style={styles.circleLabel}>Makeup</p>
                    </div>
                    <div style={styles.circleButton} onClick={() => handleNavigate('/*')}>
                        <img style={styles.circleImage} src={SkincareCircle} alt="Skincare" />
                        <p style={styles.circleLabel}>Skincare</p>
                    </div>
                    <div style={styles.circleButton} onClick={() => handleNavigate('/*')}>
                        <img style={styles.circleImage} src={BodycareCircle} alt="Bodycare" />
                        <p style={styles.circleLabel}>Body Care</p>
                    </div>
                    <div style={styles.circleButton} onClick={() => handleNavigate('/*')}>
                        <img style={styles.circleImage} src={BeautyToolsCircle} alt="Beauty Tools" />
                        <p style={styles.circleLabel}>Beauty Tools</p>
                    </div>
                    <div style={styles.circleButton} onClick={() => handleNavigate('/*')}>
                        <img style={styles.circleImage} src={GiftCardsCircle} alt="Gift Cards" />
                        <p style={styles.circleLabel}>Gift cards</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


const styles = {
    moreToSeeContainer: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: '32px',
        fontWeight: '400',
        marginBottom: '40px',
        color: '#000',
    },
    circlesContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap',
    },
    circleButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
    },
    circleImage: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '12px',
    },
    circleLabel: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#000',
        margin: '0',
    },
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import deal1 from '../../../assets/img/main-img/deal 1.png';
import deal2 from '../../../assets/img/main-img/deal 2.png';
import deal3 from '../../../assets/img/main-img/deal 3.png';
import deal4 from '../../../assets/img/main-img/deal 4.png';


const dealsData = [
    {
        id: 1,
        image: deal1,
        title: 'Eye Palette Deal',
    },
    {
        id: 2,
        image: deal2,
        title: 'Lip Products Deal',
    },
    {
        id: 3,
        image: deal3,
        title: 'Face Products Deal',
    },
    {
        id: 4,
        image: deal4,
        title: 'Skincare Set Deal',
    }
];

export default function DealOfTheMonth() {
    const [currentDeal, setCurrentDeal] = useState(0);
    const navigate = useNavigate();

    const imageUrl = dealsData[currentDeal].image;

    const handlePrevious = () => {
        setCurrentDeal((prev) => (prev === 0 ? dealsData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentDeal((prev) => (prev === dealsData.length - 1 ? 0 : prev + 1));
    };

    const handleShopNow = () => {
        navigate('/all-products');
    };

    return (
        <div style={styles.dealContainer}>
            <div style={styles.carouselWrapper}>
                <div style={styles.dealContent}>
                    <img src={imageUrl} alt="Deal" style={styles.dealImage} />
                    
                    <button style={styles.navButtonLeft} onClick={handlePrevious}>
                        <ChevronLeft size={24} color="#000" />
                    </button>

                    <button style={styles.navButtonRight} onClick={handleNext}>
                        <ChevronRight size={24} color="#000" />
                    </button>

                    <div style={styles.textOverlay}>
                        <h2 style={styles.title}>Deal of the month</h2>
                    </div>
                    
                    <div style={styles.dotsContainer}>
                        {dealsData.map((_, index) => (
                            <span
                                key={index}
                                style={{
                                    ...styles.dot,
                                    ...(index === currentDeal ? styles.dotActive : {}),
                                }}
                                onClick={() => setCurrentDeal(index)}
                            ></span>
                        ))}
                    </div>
                    <button style={styles.shopButton} onClick={handleShopNow}>Shop now</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    dealContainer: {
        width: '100%',
        margin: '0',
        padding: '77px 0',
    },
    carouselWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    navButtonLeft: {
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        border: 'none',
        cursor: 'pointer',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        zIndex: 15,
        width: '44px',
        height: '44px',
    },
    navButtonRight: {
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        border: 'none',
        cursor: 'pointer',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        zIndex: 15,
        width: '44px',
        height: '44px',
    },
    dealContent: {
        position: 'relative',
        width: '100%',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dealImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    textOverlay: {
        position: 'absolute',
        top: '30px',
        left: '30px',
        zIndex: 5,
    },
    title: {
        margin: 0,
        fontSize: '32px',
        fontWeight: '700',
        color: '#000',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    dotActive: {
        backgroundColor: '#fff',
    },
    shopButton: {
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#FFBCBC',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '25px',
        fontFamily: 'MediumFont',
        zIndex: 10,
    },
};

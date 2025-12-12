import React, { useState, useEffect } from 'react';
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <div className="deal-container" style={styles.dealContainer(isMobile)}>
            <div className="deal-carousel-wrapper" style={styles.carouselWrapper}>
                <div className="deal-content" style={styles.dealContent(isMobile)}>
                    <img className="deal-image" src={imageUrl} alt="Deal" style={styles.dealImage} />
                    
                    <button className="deal-nav-button deal-nav-left" style={styles.navButtonLeft(isMobile)} onClick={handlePrevious}>
                        <ChevronLeft size={isMobile ? 20 : 24} color="#000" />
                    </button>

                    <button className="deal-nav-button deal-nav-right" style={styles.navButtonRight(isMobile)} onClick={handleNext}>
                        <ChevronRight size={isMobile ? 20 : 24} color="#000" />
                    </button>

                    <div className="deal-text-overlay" style={styles.textOverlay(isMobile)}>
                        <h2 className="deal-title" style={styles.title(isMobile)}>Deal of the month</h2>
                    </div>
                    
                    <div className="deal-dots-container" style={styles.dotsContainer(isMobile)}>
                        {dealsData.map((_, index) => (
                            <span
                                key={index}
                                className="deal-dot"
                                style={{
                                    ...styles.dot(isMobile),
                                    ...(index === currentDeal ? styles.dotActive : {}),
                                }}
                                onClick={() => setCurrentDeal(index)}
                            ></span>
                        ))}
                    </div>
                    <button className="deal-shop-button" style={styles.shopButton(isMobile)} onClick={handleShopNow}>Shop now</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    dealContainer: (isMobile) => ({
        width: '100%',
        margin: '0',
        padding: isMobile ? '40px 0' : '77px 0',
    }),
    carouselWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    navButtonLeft: (isMobile) => ({
        position: 'absolute',
        left: isMobile ? '10px' : '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        border: 'none',
        cursor: 'pointer',
        padding: isMobile ? '8px' : '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        zIndex: 15,
        width: isMobile ? '36px' : '44px',
        height: isMobile ? '36px' : '44px',
    }),
    navButtonRight: (isMobile) => ({
        position: 'absolute',
        right: isMobile ? '10px' : '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        border: 'none',
        cursor: 'pointer',
        padding: isMobile ? '8px' : '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        zIndex: 15,
        width: isMobile ? '36px' : '44px',
        height: isMobile ? '36px' : '44px',
    }),
    dealContent: (isMobile) => ({
        position: 'relative',
        width: '100%',
        height: isMobile ? '300px' : '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    dealImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    textOverlay: (isMobile) => ({
        position: 'absolute',
        top: isMobile ? '15px' : '30px',
        left: isMobile ? '15px' : '30px',
        zIndex: 5,
    }),
    title: (isMobile) => ({
        margin: 0,
        fontSize: isMobile ? '18px' : '32px',
        fontWeight: '700',
        color: '#000',
    }),
    dotsContainer: (isMobile) => ({
        position: 'absolute',
        bottom: isMobile ? '50px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: isMobile ? '5px' : '8px',
        zIndex: 10,
    }),
    dot: (isMobile) => ({
        width: isMobile ? '8px' : '10px',
        height: isMobile ? '8px' : '10px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    }),
    dotActive: {
        backgroundColor: '#fff',
    },
    shopButton: (isMobile) => ({
        position: 'absolute',
        bottom: isMobile ? '15px' : '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#FFBCBC',
        border: 'none',
        padding: isMobile ? '8px 16px' : '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: isMobile ? '16px' : '25px',
        fontFamily: 'MediumFont',
        zIndex: 10,
        whiteSpace: 'nowrap',
    }),
};

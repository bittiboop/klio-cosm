import React from 'react';
import ceoImg from '../../assets/img/aboutUs/ceo_img.jpg';
import ceoName from '../../assets/img/aboutUs/ceo_name.png';

const mobileStyles = `
@media (max-width: 768px) {
    .about-hero-section {
        padding: 60px 20px !important;
    }
    .about-hero-title {
        font-size: 36px !important;
    }
    .about-hero-subtitle {
        font-size: 16px !important;
    }
    .about-wrapper {
        padding: 0 16px 40px 16px !important;
    }
    .about-section-title {
        font-size: 24px !important;
        margin-bottom: 16px !important;
    }
    .about-text {
        font-size: 15px !important;
    }
    .about-ceo-section {
        padding: 40px 24px !important;
    }
    .about-ceo-content {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
    }
    .about-ceo-image-container {
        position: static !important;
        max-width: 100% !important;
    }
    .about-ceo-message {
        font-size: 24px !important;
    }
    .about-values-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
        gap: 16px !important;
    }
}

@media (max-width: 480px) {
    .about-container {
        padding-top: 50px !important;
    }
    .about-hero-section {
        padding: 40px 20px !important;
        margin-bottom: 30px !important;
    }
    .about-hero-title {
        font-size: 28px !important;
        margin-bottom: 10px !important;
    }
    .about-hero-subtitle {
        font-size: 14px !important;
    }
    .about-wrapper {
        padding: 0 12px 30px 12px !important;
    }
    .about-section {
        margin-bottom: 30px !important;
    }
    .about-section-title {
        font-size: 20px !important;
        margin-bottom: 12px !important;
        padding-bottom: 10px !important;
    }
    .about-text {
        font-size: 14px !important;
        line-height: 1.6 !important;
    }
    .about-ceo-section {
        padding: 24px 16px !important;
        margin-bottom: 30px !important;
        border-radius: 12px !important;
    }
    .about-ceo-content {
        gap: 24px !important;
    }
    .about-ceo-message {
        font-size: 20px !important;
        line-height: 1.3 !important;
    }
    .about-ceo-sub-message {
        font-size: 14px !important;
        line-height: 1.6 !important;
    }
    .about-ceo-image {
        border-radius: 12px !important;
        border-width: 2px !important;
    }
    .about-ceo-name-container {
        max-width: 120px !important;
    }
    .about-ceo-name-img {
        padding-top: 30px !important;
    }
    .about-ceo-title {
        font-size: 12px !important;
        letter-spacing: 0.3px !important;
    }
    .about-value-card {
        padding: 16px !important;
        border-radius: 6px !important;
    }
    .about-values-grid {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
    }
    .about-value-title {
        font-size: 16px !important;
        margin-bottom: 8px !important;
    }
    .about-value-text {
        font-size: 13px !important;
        line-height: 1.5 !important;
    }
}
`;

export default function AboutUs() {
    return (
        <div style={styles.container} className="about-container">
            <style>{mobileStyles}</style>
            {/* Hero Section */}
            <div style={styles.heroSection} className="about-hero-section">
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle} className="about-hero-title">About CLIO</h1>
                    <p style={styles.heroSubtitle} className="about-hero-subtitle">A sailboat, poised to become a market leader, shaking up the global market</p>
                </div>
            </div>

            {/* Main Content */}
            <div style={styles.wrapper} className="about-wrapper">
                {/* About Section */}
                <section style={styles.section} className="about-section">
                    <h2 style={styles.sectionTitle} className="about-section-title">Our Story</h2>
                    <div style={styles.contentBlock}>
                        <p style={styles.text} className="about-text">
                            Clio is a sailboat, poised to become a market leader, shaking up the global market.
                        </p>
                        <p style={styles.text} className="about-text">
                            Clio's history is, in a word, a history of innovation. Embracing innovation since its founding, Clio has consistently launched innovative products and brands that lead the market. Despite rapid changes in distribution channels, Clio has achieved new leaps and growth.
                        </p>
                    </div>
                </section>

                {/* Vision Section */}
                <section style={styles.section} className="about-section">
                    <h2 style={styles.sectionTitle} className="about-section-title">Our Vision & Mission</h2>
                    <div style={styles.contentBlock}>
                        <p style={styles.text} className="about-text">
                            This year, Clio's management goals are customer experience, digital, and global. We will become more sensitive to customer changes and new demands, and transform into an innovative brand that effectively communicates with them. Specifically, we will strive to provide faster, more efficient, and smarter services through digital transformation in line with the Fourth Industrial Revolution.
                        </p>
                        <p style={styles.text} className="about-text">
                            Building on our solid success in the domestic market, we will stand tall as a leading K-beauty brand in the global market.
                        </p>
                    </div>
                </section>

                {/* Purpose Section */}
                <section style={styles.section} className="about-section">
                    <h2 style={styles.sectionTitle} className="about-section-title">Our Purpose</h2>
                    <div style={styles.contentBlock}>
                        <p style={styles.text} className="about-text">
                            Clio exists to provide confidence and joy to customers who embrace new experiences through cosmetics. <strong>"Every Pouch One Clio"</strong> We will continue our innovation efforts until the day when Clio products are in every customer's pouch around the world.
                        </p>
                    </div>
                </section>

                {/* CEO Message Section */}
                <section style={styles.ceoSection} className="about-ceo-section">
                    <h2 style={styles.sectionTitle} className="about-section-title">A Message from Our CEO</h2>
                    <div style={styles.ceoContent} className="about-ceo-content">
                        <div style={styles.ceoImageContainer} className="about-ceo-image-container">
                            <img src={ceoImg} alt="CEO" style={styles.ceoImage} className="about-ceo-image" />
                        </div>
                        <div style={styles.ceoInfo}>
                            <p style={styles.ceoMessage} className="about-ceo-message">
                                Thank you for your trust and support in CLIO.
                            </p>
                            <p style={styles.ceoSubMessage} className="about-ceo-sub-message">
                                At CLIO, we believe that beauty is more than just makeup—it's about confidence, self-expression, and embracing who you are. We are committed to delivering innovative products and exceptional quality that empower our customers to look and feel their best.
                            </p>
                            <p style={styles.ceoSubMessage} className="about-ceo-sub-message">
                                As we continue to grow and expand globally, we remain dedicated to our core values of innovation, customer experience, and digital transformation. We are honored to be a part of your beauty journey and look forward to creating more beautiful moments together.
                            </p>
                            <div style={styles.ceoNameContainer} className="about-ceo-name-container">
                                <img src={ceoName} alt="CEO Name" style={styles.ceoNameImg} className="about-ceo-name-img" />
                            </div>
                            <p style={styles.ceoTitle} className="about-ceo-title">CEO of CLIO Co., Ltd.</p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section style={styles.valuesSection}>
                    <h2 style={styles.sectionTitle} className="about-section-title">Our Core Values</h2>
                    <div style={styles.valuesGrid} className="about-values-grid">
                        <div style={styles.valueCard} className="about-value-card">
                            <h3 style={styles.valueTitle} className="about-value-title">Innovation</h3>
                            <p style={styles.valueText} className="about-value-text">Consistently delivering innovative products and brands that lead the market</p>
                        </div>
                        <div style={styles.valueCard} className="about-value-card">
                            <h3 style={styles.valueTitle} className="about-value-title">Customer Experience</h3>
                            <p style={styles.valueText} className="about-value-text">Becoming more sensitive to customer changes and new demands</p>
                        </div>
                        <div style={styles.valueCard} className="about-value-card">
                            <h3 style={styles.valueTitle} className="about-value-title">Digital Transformation</h3>
                            <p style={styles.valueText} className="about-value-text">Providing faster, more efficient, and smarter services</p>
                        </div>
                        <div style={styles.valueCard} className="about-value-card">
                            <h3 style={styles.valueTitle} className="about-value-title">Global Leadership</h3>
                            <p style={styles.valueText} className="about-value-text">Standing tall as a leading K-beauty brand in the global market</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#fff',
        minHeight: '100vh',
        paddingTop: '60px',
    },
    heroSection: {
        backgroundColor: '#F1C3C3',
        padding: '80px 20px',
        textAlign: 'center',
        marginBottom: '60px',
    },
    heroContent: {
        maxWidth: '1120px',
        margin: '0 auto',
    },
    heroTitle: {
        fontSize: '48px',
        fontWeight: '700',
        margin: 0,
        marginBottom: '16px',
        color: '#000',
        fontFamily: 'SemiBoldFont, sans-serif',
    },
    heroSubtitle: {
        fontSize: '20px',
        color: '#333',
        margin: 0,
        fontFamily: 'RegularFont, sans-serif',
    },
    wrapper: {
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '0 20px 60px 20px',
    },
    section: {
        marginBottom: '60px',
    },
    sectionTitle: {
        fontSize: '32px',
        fontWeight: '700',
        margin: '0 0 24px 0',
        color: '#000',
        fontFamily: 'SemiBoldFont, sans-serif',
        borderBottom: '3px solid #FFBCBC',
        paddingBottom: '16px',
    },
    contentBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    text: {
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#333',
        margin: 0,
        fontFamily: 'RegularFont, sans-serif',
    },
    ceoSection: {
        backgroundColor: '#fff',
        padding: '60px 40px',
        borderRadius: '16px',
        marginBottom: '60px',
        border: '2px solid #FFBCBC',
        boxShadow: '0 4px 12px rgba(255, 188, 188, 0.15)',
    },
    ceoContent: {
        display: 'grid',
        gridTemplateColumns: '420px 1fr',
        gap: '60px',
        alignItems: 'flex-start',
    },
    ceoImageContainer: {
        width: '100%',
        maxWidth: '420px',
        position: 'sticky',
        top: '120px',
    },
    ceoImage: {
        width: '100%',
        borderRadius: '16px',
        objectFit: 'cover',
        boxShadow: '0 12px 32px rgba(255, 188, 188, 0.25)',
        border: '3px solid #FFBCBC',
    },
    ceoInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    ceoMessage: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#000',
        margin: 0,
        fontFamily: 'SemiBoldFont, sans-serif',
        lineHeight: '1.4',
    },
    ceoSubMessage: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#555',
        margin: 0,
        fontFamily: 'RegularFont, sans-serif',
        lineHeight: '1.8',
    },
    ceoNameContainer: {
        maxWidth: '140px',
    },
    ceoNameImg: {
        width: '100%',
        height: 'auto',
        paddingTop: '50px',
    },
    ceoTitle: {
        fontSize: '14px',
        color: '#999',
        margin: 0,
        fontFamily: 'RegularFont, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        textAlign: 'left',
    },
    valuesSection: {
        marginBottom: '40px',
    },
    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
    },
    valueCard: {
        padding: '24px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        borderTop: '4px solid #FFBCBC',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    valueTitle: {
        fontSize: '18px',
        fontWeight: '700',
        margin: '0 0 12px 0',
        color: '#000',
        fontFamily: 'MediumFont, sans-serif',
    },
    valueText: {
        fontSize: '14px',
        color: '#666',
        margin: 0,
        lineHeight: '1.6',
        fontFamily: 'RegularFont, sans-serif',
    },
};

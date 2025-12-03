import React, { act } from 'react';
import heartIcon from "../assets/img/icons-btn/heart-icon.png";
import ProductList from "../assets/data/products.json";
import likedHeartIcon from "../assets/img/icons-btn/liked-heart-icon.png";

export default function ProductCard({ProductList}) {
    const [isLiked, setIsLiked] = React.useState(false);

    return (
        <>
            <div styles={styles.card}>
                <div style={styles.imageContainer}>
                    <img src={ProductList.image} alt={ProductList.name} style={styles.image} />
                </div>
                <div style={styles.dotsContainer}>
                    <span style={{...styles.dot, ...styles.dotActive}}></span>
                    <span style={styles.dot}></span>
                </div>
            

                <div style={styles.infoContainer}>
                    <div style={styles.headerRow}>
                        <h3 style={styles.title}>{ProductList.name}</h3>
                        <button onClick={() => setIsLiked(!isLiked)} style={styles.likeButton}>
                            <img src={isLiked ? likedHeartIcon : heartIcon} alt="like icon" />
                        </button>
                    </div>
                    <p style={styles.price}>{ProductList.price}{ProductList.currency}</p>
                    <p style={styles.description}>{ProductList.description}</p>
                    
                    {isLiked && alert("Added to your liked products:" + ProductList.name)}

                    <button
                    style={styles.addToCartBtn}
                    onMouseOver={(e)=> e.target.style.backgroundColor = '#F1C3C3'}
                    onMouseOut={(e)=> e.target.style.backgroundColor = '#FFBCBC'}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
}

const styles= {
    card:{
        width: '300px',
        backgtoundColor: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '10px',
    },
    imageContainer:{
        width: '100%',
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: '6px',
    },
    image:{
        maxWidth: '90%',
        maxHeight: '90%',
        objectFit: 'contain',
    },
    dotsContainer:{
        position: 'absolute',
        bottom: '10px',
        display: 'flex',
        gap: '6px',
    },
    dot:{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#d9d9d9',
    },
    dotActive:{
        backgroundColor: '#757575',
    },
    infoContainer:{
        padding: '5px 0',
        display: 'flex',
        flexDirection: 'column',
    },
    headerRow:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2px',
    },
    title:{
        fontFamily: 'RegularFont',
        fontSize: '18px',
        margin: 0,
        color: '#000',
    },
    likeButton:{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
    },
    price:{
        fontFamily: 'SemiBoldFont',
        fontSize: '16px',
        margin: '0 0 10px 0',
        color: '#000',
    },
    description:{
        fontFamily: 'RegularFont',
        fontSize: '13px',
        margin: '0 0 20px 0',
        lineHeight: '1.4',
        minHeight: '54px',
        color: '#555',
    },
    addToCartBtn:{
        backgroundColor: '#FFBCBC',
        border: 'none',
        fontFamily: 'MediumFont',
        fontSize: '15px',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#000',
    }
}
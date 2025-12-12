import React from 'react';

import DealOfTheMonth from './components/DealOfTheMonth.jsx';
import OurProducts from './components/OurProducts.jsx';
import Subscribe from '../../components/Subscribe.jsx';
import Bestsellers from '../../components/Bestsellers.jsx';
import MoreToSee from '../../components/MoreToSee.jsx';
import Reviews from './components/Reviews.jsx';

export default function MainPage() {
    return(
        <div style={{ width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }}>
            <DealOfTheMonth/>
            <OurProducts/>
            <Bestsellers/>
            <Reviews/>
            <MoreToSee/>
            <Subscribe/>
        </div>
    )

}
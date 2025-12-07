import React from 'react';

import DealOfTheMonth from './components/DealOfTheMonth.jsx';
import OurProducts from './components/OurProducts.jsx';
import Subscribe from '../../components/Subscribe.jsx';
import Bestsellers from '../../components/Bestsellers.jsx';
import MoreToSee from '../../components/MoreToSee.jsx';

export default function MainPage() {
    return(
        <div>
            <DealOfTheMonth/>
            <OurProducts/>
            <Bestsellers/>
            <MoreToSee/>
            <Subscribe/>
        </div>
    )

}
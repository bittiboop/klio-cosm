import React, { useState } from 'react';
import './App.css';
import './styles/mobile.css';
import './styles/product-card-mobile.css';
import './styles/profile-cart-mobile.css';
import './styles/pages-mobile.css';
import './styles/mainpage-mobile.css';

import Layout from '../src/components/Layout.jsx';
import MainPage from '../src/screens/Main/MainPage.jsx';
import PalettesPage from '../src/screens/EyePalettes/PalettesPage.jsx';
import LipPage from '../src/screens/LipProducts/LipPage.jsx';
import FacePage from '../src/screens/FaceProducts/FacePage.jsx';
import AllProducts from '../src/screens/AllProducts/AllProducts.jsx';
import NotFoundPage from '../src/components/404Page.jsx';
import ProductPage from '../src/screens/ProductPage/ProductPage.jsx';
import ProfilePage from '../src/screens/ProfilePage/ProfilePage.jsx';
import AboutUs from '../src/screens/AboutUs/AboutUs.jsx';
import AuthModal from '../src/screens/Auth/AuthModal.jsx';
import ShoppingCartPage from '../src/screens/ShoppingCart-drawer/ShoppingCartPage.jsx';
import NotificationContainer from '../src/components/NotificationContainer.jsx';
import { SearchProvider } from '../src/features/SearchContext.jsx';
import { AuthProvider } from '../src/features/AuthContext.jsx';
import { NotificationProvider } from '../src/features/NotificationContext.jsx';
import SearchModal from '../src/features/SearchModal.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store.js';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Provider store={store}>
      <NotificationProvider>
        <SearchProvider>
          <AuthProvider onAuthRequired={() => setIsAuthModalOpen(true)}>
            <Router>
              <div className="App">
                <NotificationContainer />
                <SearchModal />
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
                <ShoppingCartPage isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                <Routes>
                  <Route path='/' element={<Layout authModalOpen={() => setIsAuthModalOpen(true)} onCartClick={() => setIsCartOpen(true)} />}>
                    <Route index element={<MainPage />} />
                    <Route path='product/:productId' element={<ProductPage />} />
                    <Route path='all-products' element={<AllProducts />} />
                    <Route path='palettes' element={<PalettesPage />} />
                    <Route path='lip' element={<LipPage />} />
                    <Route path='face' element={<FacePage />} />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path='about' element={<AboutUs />} />
                    <Route path='*' element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </SearchProvider>
      </NotificationProvider>
    </Provider>
  );
}

export default App;


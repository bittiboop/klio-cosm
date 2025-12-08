import React, { useState } from 'react';
import './App.css';

import Layout from '../src/components/Layout.jsx';
import MainPage from '../src/screens/Main/MainPage.jsx';
import PalettesPage from '../src/screens/EyePalettes/PalettesPage.jsx';
import LipPage from '../src/screens/LipProducts/LipPage.jsx';
import FacePage from '../src/screens/FaceProducts/FacePage.jsx';
import AllProducts from '../src/screens/AllProducts/AllProducts.jsx';
import NotFoundPage from '../src/components/404Page.jsx';
import ProductPage from '../src/screens/ProductPage/ProductPage.jsx';
import AuthModal from '../src/screens/Auth/AuthModal.jsx';
import { SearchProvider } from '../src/features/SearchContext.jsx';
import SearchModal from '../src/features/SearchModal.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store.js';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="App">
        <SearchProvider>
          <Router>
            <SearchModal />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <Routes>
              <Route path='/' element={<Layout authModalOpen={() => setIsAuthModalOpen(true)} />}>
                <Route index element={<MainPage />} />
                <Route path='product/:productId' element={<ProductPage />} />
                <Route path='all-products' element={<AllProducts />} />
                <Route path='palettes' element={<PalettesPage />} />
                <Route path='lip' element={<LipPage />} />
                <Route path='face' element={<FacePage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </SearchProvider>
      </div>
    </Provider>
  );
}

export default App;


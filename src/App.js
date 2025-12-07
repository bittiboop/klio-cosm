import React from 'react';
import './App.css';

import Layout from '../src/components/Layout.jsx';
import MainPage from '../src/screens/Main/MainPage.jsx';
import PalettesPage from '../src/screens/EyePalettes/PalettesPage.jsx';
import LipPage from '../src/screens/LipProducts/LipPage.jsx';
import FacePage from '../src/screens/FaceProducts/FacePage.jsx';
import NotFoundPage from '../src/components/404Page.jsx';
import ProductPage from '../src/screens/ProductPage/ProductPage.jsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='product/:productId' element={<ProductPage />} />
            <Route path='palettes' element={<PalettesPage />} />
            <Route path='lip' element={<LipPage />} />
            <Route path='face' element={<FacePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

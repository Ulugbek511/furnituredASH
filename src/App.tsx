import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutPage from './components/Layout.jsx';
import ProductsPage from './components/ProductPage.tsx';
import Categories from './components/CategoryPage.tsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LayoutPage />}>
            <Route path='/products' index element={<ProductsPage />} />
            <Route path='/category' element={<Categories />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </React.Suspense>
  );
}

export default App;

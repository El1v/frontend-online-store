import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css';
import Product from './components/Product';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
      <Route exact path="/Cart" component={ Cart } />
      <Route path="/product/:id" component={ Product } />
      <Route path="/Payment" component={ Checkout } />
    </BrowserRouter>
  );
}

export default App;

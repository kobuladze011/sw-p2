import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Animals from './pages/Animals';
import AnimalDetail from './pages/AnimalDetail';
import Categories from './pages/Categories';
import CategoryAnimals from './pages/CategoryAnimals';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import AdminPanel from './admin/AdminPanel';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/animal/:id" element={<AnimalDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryAnimals />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;

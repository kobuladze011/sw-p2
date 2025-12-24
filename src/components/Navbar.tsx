import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/" className={styles.brandName}>
          PetShop
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={isActive('/')}>Home</Link>
        </li>
        <li>
          <Link to="/wishlist" className={isActive('/wishlist')}>
            Wishlist
            {wishlistItems.length > 0 && (
              <span className={styles.badge}>{wishlistItems.length}</span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/cart" className={isActive('/cart')}>
            Cart
            {cartItems.length > 0 && (
              <span className={styles.badge}>{cartItems.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

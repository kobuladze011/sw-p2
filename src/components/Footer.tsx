import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>About PetShop</h3>
          <p className={styles.footerText}>
            We're dedicated to connecting loving homes with wonderful pets. Our mission is to ensure every pet finds a caring family.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact Us</h3>
          <p className={styles.footerText}>Email: info@petshop.com</p>
          <p className={styles.footerText}>Phone: (123) 456-7890</p>
          <p className={styles.footerText}>Address: 123 Pet Street, Animalville</p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 PetShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


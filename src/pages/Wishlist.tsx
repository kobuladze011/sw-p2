import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import CurrencyToggle from '../components/CurrencyToggle';
import styles from './Wishlist.module.css';

const Wishlist: React.FC = () => {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState('USD');

  const handleCurrencyChange = (rate: number, curr: string) => {
    setCurrencyRate(rate);
    setCurrency(curr);
  };

  const handleRemove = (id: number, name: string) => {
    dispatch(removeFromWishlist(id));
    toast.success(`${name} removed from wishlist`);
  };

  const handleAddToCart = (animal: (typeof wishlistItems)[0]) => {
    if (!animal.isStock) {
      toast.error('This animal is out of stock');
      return;
    }
    dispatch(addToCart(animal));
    toast.success(`${animal.name} added to cart`);
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencyRate;
    return currency === 'GEL'
      ? `₾${convertedPrice.toFixed(2)}`
      : `$${convertedPrice.toFixed(2)}`;
  };

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Wishlist</h1>
        <div className={styles.empty}>
          <p>Your wishlist is empty</p>
          <button
            className={styles.shopButton}
            onClick={() => navigate('/animals')}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Wishlist ({wishlistItems.length})</h1>
        <CurrencyToggle onRateChange={handleCurrencyChange} />
      </div>

      <div className={styles.itemsGrid}>
        {wishlistItems.map((item) => (
          <div key={item.id} className={styles.wishlistCard}>
            <h3 className={styles.itemName}>{item.name}</h3>
            <div className={styles.itemPrice}>{formatPrice(item.price)}</div>
            <p className={styles.itemDescription}>{item.description}</p>

            <div className={styles.badges}>
              {item.isPopular && (
                <span className={`${styles.badge} ${styles.badgePopular}`}>
                  Popular
                </span>
              )}
              <span
                className={`${styles.badge} ${item.isStock ? styles.badgeInStock : styles.badgeOutOfStock}`}
              >
                {item.isStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.button} ${styles.buttonPrimary} ${!item.isStock ? styles.buttonDisabled : ''}`}
                onClick={() => handleAddToCart(item)}
                disabled={!item.isStock}
              >
                Add to Cart
              </button>
              <button
                className={`${styles.button} ${styles.buttonDanger}`}
                onClick={() => handleRemove(item.id, item.name)}
              >
                Remove
              </button>
            </div>

            <button
              className={styles.viewDetails}
              onClick={() => navigate(`/animal/${item.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

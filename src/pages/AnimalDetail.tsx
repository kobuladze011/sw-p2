import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { animalsApi } from '../api/apiService';
import { Animal } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import CurrencyToggle from '../components/CurrencyToggle';
import styles from './AnimalDetail.module.css';

const AnimalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimal = async () => {
      if (!id) return;
      try {
        const response = await animalsApi.getById(parseInt(id));
        setAnimal(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch animal details');
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  const handleCurrencyChange = (rate: number, curr: string) => {
    setCurrencyRate(rate);
    setCurrency(curr);
  };

  const handleAddToCart = () => {
    if (!animal) return;
    if (!animal.isStock) {
      toast.error('This animal is out of stock');
      return;
    }
    dispatch(addToCart(animal));
    toast.success(`${animal.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    if (!animal) return;
    dispatch(toggleWishlist(animal));
    const isInWishlist = wishlistItems.some((item) => item.id === animal.id);
    toast.success(
      isInWishlist
        ? `${animal.name} removed from wishlist`
        : `${animal.name} added to wishlist`
    );
  };

  const isInWishlist = () => {
    if (!animal) return false;
    return wishlistItems.some((item) => item.id === animal.id);
  };

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencyRate;
    return currency === 'GEL'
      ? `₾${convertedPrice.toFixed(2)}`
      : `$${convertedPrice.toFixed(2)}`;
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!animal) {
    return <div className={styles.loading}>Animal not found</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.detailCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>{animal.name}</h1>
          <CurrencyToggle onRateChange={handleCurrencyChange} />
        </div>

        <div className={styles.price}>{formatPrice(animal.price)}</div>

        <div className={styles.badges}>
          {animal.isPopular && (
            <span className={`${styles.badge} ${styles.badgePopular}`}>
              Popular
            </span>
          )}
          <span
            className={`${styles.badge} ${animal.isStock ? styles.badgeInStock : styles.badgeOutOfStock}`}
          >
            {animal.isStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className={styles.description}>
          <h3>Description</h3>
          <p>{animal.description}</p>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.buttonPrimary} ${!animal.isStock ? styles.buttonDisabled : ''}`}
            onClick={handleAddToCart}
            disabled={!animal.isStock}
          >
            Add to Cart
          </button>
          <button
            className={`${styles.button} ${styles.buttonSecondary} ${isInWishlist() ? styles.active : ''}`}
            onClick={handleToggleWishlist}
          >
            {isInWishlist() ? '❤ Remove from Wishlist' : '🤍 Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;

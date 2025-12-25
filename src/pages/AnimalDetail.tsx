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
      <div className={styles.currencyToggleContainer}>
        <CurrencyToggle onRateChange={handleCurrencyChange} />
      </div>

      <div className={styles.productLayout}>
        <div className={styles.imageSection}>
          {animal.imageUrl ? (
            <img 
              src={animal.imageUrl} 
              alt={animal.name}
              className={styles.productImage}
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.title}>
            {animal.name} - {animal.category || 'Pet'}
          </h1>

          <p className={styles.description}>{animal.description}</p>

          <div className={styles.specsList}>
            {animal.weight && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Weight:</span>
                <span className={styles.specValue}>{animal.weight}</span>
              </div>
            )}
            {animal.height && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Height:</span>
                <span className={styles.specValue}>{animal.height}</span>
              </div>
            )}
            {animal.color && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Color:</span>
                <span className={styles.specValue}>{animal.color}</span>
              </div>
            )}
            {animal.gender && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Gender:</span>
                <span className={styles.specValue}>{animal.gender}</span>
              </div>
            )}
            {animal.vaccinated && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vaccinated:</span>
                <span className={styles.specValue}>{animal.vaccinated}</span>
              </div>
            )}
            {animal.microchipped && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Microchipped:</span>
                <span className={styles.specValue}>{animal.microchipped}</span>
              </div>
            )}
            {animal.age && (
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Age:</span>
                <span className={styles.specValue}>{animal.age}</span>
              </div>
            )}
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Status:</span>
              <span className={styles.specValue}>
                {animal.isStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className={styles.price}>{formatPrice(animal.price)}</div>

          <div className={styles.actions}>
            <button
              className={styles.buttonWishlist}
              onClick={handleToggleWishlist}
            >
              Add to Wishlist
            </button>
            <button
              className={`${styles.buttonCart} ${!animal.isStock ? styles.buttonDisabled : ''}`}
              onClick={handleAddToCart}
              disabled={!animal.isStock}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;

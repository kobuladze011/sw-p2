import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { animalsApi } from '../api/apiService';
import { Animal } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import CurrencyToggle from '../components/CurrencyToggle';
import styles from './Animals.module.css';

const Animals: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await animalsApi.getAll();
        setAnimals(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch animals');
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  const handleCurrencyChange = (rate: number, curr: string) => {
    setCurrencyRate(rate);
    setCurrency(curr);
  };

  const handleAddToCart = (animal: Animal) => {
    if (!animal.isStock) {
      toast.error('This animal is out of stock');
      return;
    }
    dispatch(addToCart(animal));
    toast.success(`${animal.name} added to cart`);
  };

  const handleToggleWishlist = (animal: Animal) => {
    dispatch(toggleWishlist(animal));
    const isInWishlist = wishlistItems.some((item) => item.id === animal.id);
    toast.success(
      isInWishlist
        ? `${animal.name} removed from wishlist`
        : `${animal.name} added to wishlist`
    );
  };

  const isInWishlist = (animalId: number) => {
    return wishlistItems.some((item) => item.id === animalId);
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Animals</h1>
        <CurrencyToggle onRateChange={handleCurrencyChange} />
      </div>

      <div className={styles.animalsGrid}>
        {animals.map((animal) => (
          <div
            key={animal.id}
            className={styles.animalCard}
            onClick={() => navigate(`/animal/${animal.id}`)}
          >
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

            <div className={styles.imageContainer}>
              {animal.imageUrl ? (
                <img 
                  src={animal.imageUrl} 
                  alt={animal.name}
                  className={styles.animalImage}
                />
              ) : (
                <div className={styles.imagePlaceholder} style={{
                  background: `linear-gradient(135deg, 
                    ${animal.id % 3 === 0 ? '#81c784, #66bb6a' : 
                      animal.id % 3 === 1 ? '#64b5f6, #42a5f5' : 
                      '#ffb74d, #ffa726'})`
                }} />
              )}
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.animalName}>{animal.name} - {animal.category || 'Pet'}</h3>
              <div className={styles.animalPrice}>{formatPrice(animal.price)}</div>
              <p className={styles.animalDescription}>{animal.description}</p>
              
              <div className={styles.cardActions}>
                <button
                  className={styles.detailsButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/animal/${animal.id}`);
                  }}
                >
                  Details
                </button>
                
                <div className={styles.iconButtons}>
                  <button
                    className={`${styles.iconButton} ${isInWishlist(animal.id) ? styles.active : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(animal);
                    }}
                    aria-label="Add to wishlist"
                  >
                    {isInWishlist(animal.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    className={`${styles.iconButton} ${!animal.isStock ? styles.disabled : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(animal);
                    }}
                    disabled={!animal.isStock}
                    aria-label="Add to cart"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animals;

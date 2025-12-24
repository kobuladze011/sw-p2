import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { animalsWithCategoriesApi, categoriesApi } from '../api/apiService';
import { Animal } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import CurrencyToggle from '../components/CurrencyToggle';
import styles from './Animals.module.css';

const CategoryAnimals: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryAnimals = async () => {
      if (!categoryId) return;
      try {
        const [animalsRes, categoryRes] = await Promise.all([
          animalsWithCategoriesApi.getAnimalsByCategory(parseInt(categoryId)),
          categoriesApi.getById(parseInt(categoryId)),
        ]);
        setAnimals(animalsRes.data);
        setCategoryName(categoryRes.data.title);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch animals');
        setLoading(false);
      }
    };

    fetchCategoryAnimals();
  }, [categoryId]);

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
        <h1 className={styles.title}>{categoryName}</h1>
        <CurrencyToggle onRateChange={handleCurrencyChange} />
      </div>

      {animals.length === 0 ? (
        <div className={styles.loading}>No animals found in this category</div>
      ) : (
        <div className={styles.animalsGrid}>
          {animals.map((animal) => (
            <div key={animal.id} className={styles.animalCard}>
              <h3 className={styles.animalName}>{animal.name}</h3>
              <div className={styles.animalPrice}>
                {formatPrice(animal.price)}
              </div>
              <p className={styles.animalDescription}>{animal.description}</p>

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

              <div className={styles.actions}>
                <button
                  className={`${styles.button} ${styles.buttonPrimary} ${!animal.isStock ? styles.buttonDisabled : ''}`}
                  onClick={() => handleAddToCart(animal)}
                  disabled={!animal.isStock}
                >
                  Add to Cart
                </button>
                <button
                  className={`${styles.button} ${styles.buttonSecondary} ${isInWishlist(animal.id) ? styles.active : ''}`}
                  onClick={() => handleToggleWishlist(animal)}
                >
                  {isInWishlist(animal.id) ? '❤' : '🤍'}
                </button>
              </div>

              <button
                className={styles.viewDetails}
                onClick={() => navigate(`/animal/${animal.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryAnimals;

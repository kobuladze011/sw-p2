import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { animalsApi, categoriesApi, animalsWithCategoriesApi } from '../api/apiService';
import { Animal, Category } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import HeroCarousel from '../components/HeroCarousel';
import CurrencyToggle from '../components/CurrencyToggle';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencyRate, setCurrencyRate] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animalsResponse, categoriesResponse] = await Promise.all([
          animalsApi.getAll(),
          categoriesApi.getAll(),
        ]);
        setAnimals(animalsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCurrencyChange = (rate: number, curr: string) => {
    setCurrencyRate(rate);
    setCurrency(curr);
  };

  const handleAddToCart = (animal: Animal, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!animal.isStock) {
      toast.error('This animal is out of stock');
      return;
    }
    dispatch(addToCart(animal));
    toast.success(`${animal.name} added to cart`);
  };

  const handleToggleWishlist = (animal: Animal, e: React.MouseEvent) => {
    e.stopPropagation();
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
      ? `₾ ${convertedPrice.toFixed(2)}`
      : `$ ${convertedPrice.toFixed(2)}`;
  };

  const getCategoryName = (animalId: number) => {
    // Simple mapping based on animal name for display
    const animalName = animals.find(a => a.id === animalId)?.name.toLowerCase() || '';
    if (animalName.includes('dog') || animalName.includes('retriever') || animalName.includes('labrador')) return 'Dog';
    if (animalName.includes('cat') || animalName.includes('persian') || animalName.includes('siamese')) return 'Cat';
    if (animalName.includes('bird') || animalName.includes('parrot')) return 'Bird';
    return 'Pet';
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <HeroCarousel animals={animals} />
      
      <div className={styles.header}>
        <CurrencyToggle onRateChange={handleCurrencyChange} />
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Pets</h2>
      </div>

      <div className={styles.animalsGrid}>
        {animals.map((animal) => (
          <div
            key={animal.id}
            className={styles.animalCard}
            onClick={() => navigate(`/animal/${animal.id}`)}
          >
            {!animal.isStock && (
              <div className={styles.outOfStockBadge}>Out of Stock</div>
            )}
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
              <h3 className={styles.animalName}>{animal.name} - {animal.category || getCategoryName(animal.id)}</h3>
              <div className={styles.animalPrice}>{formatPrice(animal.price)}</div>
              
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
                    onClick={(e) => handleToggleWishlist(animal, e)}
                    aria-label="Add to wishlist"
                  >
                    {isInWishlist(animal.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    className={`${styles.iconButton} ${!animal.isStock ? styles.disabled : ''}`}
                    onClick={(e) => handleAddToCart(animal, e)}
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

export default Home;

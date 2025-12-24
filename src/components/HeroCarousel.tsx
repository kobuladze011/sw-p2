import React, { useState, useEffect } from 'react';
import { Animal } from '../types';
import styles from './HeroCarousel.module.css';

interface HeroCarouselProps {
  animals: Animal[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ animals }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter to show only popular animals in carousel
  const featuredAnimals = animals.filter(animal => animal.isPopular).slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredAnimals.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredAnimals.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredAnimals.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredAnimals.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (featuredAnimals.length === 0) {
    return null;
  }

  const currentAnimal = featuredAnimals[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <div className={styles.imageContainer}>
          {currentAnimal.imageUrl ? (
            <img 
              src={currentAnimal.imageUrl} 
              alt={currentAnimal.name}
              className={styles.carouselImage}
            />
          ) : (
            <div className={styles.imagePlaceholder} style={{
              background: `linear-gradient(135deg, 
                ${currentIndex % 3 === 0 ? '#4fc3f7, #29b6f6' : 
                  currentIndex % 3 === 1 ? '#81c784, #66bb6a' : 
                  '#ffb74d, #ffa726'})`
            }} />
          )}
          <div className={styles.overlay}>
            <h2 className={styles.animalName}>{currentAnimal.name} - {currentAnimal.category || 'Pet'}</h2>
            <p className={styles.animalDescription}>{currentAnimal.description}</p>
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;


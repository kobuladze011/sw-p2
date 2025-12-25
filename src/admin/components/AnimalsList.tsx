import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { animalsApi } from '../../api/apiService';
import { Animal } from '../../types';
import AnimalForm from './AnimalForm';
import styles from './AnimalsList.module.css';
import adminStyles from '../AdminPanel.module.css';

type AnimalsListProps = {
  onAddNew?: () => void;
};

const AnimalsList: React.FC<AnimalsListProps> = ({ onAddNew }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this animal?')) {
      return;
    }

    try {
      await animalsApi.delete(id);
      toast.success('Animal deleted successfully');
      fetchAnimals();
    } catch (error) {
      toast.error('Failed to delete animal');
    }
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
  };

  const handleFormClose = () => {
    setEditingAnimal(null);
    fetchAnimals();
  };

  const getPetEmoji = (category: string) => {
    if (category.toLowerCase().includes('dog')) return '🐕';
    if (category.toLowerCase().includes('cat')) return '🐱';
    if (category.toLowerCase().includes('bird')) return '🦜';
    if (category.toLowerCase().includes('fish')) return '🐠';
    return '🐾';
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      {editingAnimal && (
        <AnimalForm animal={editingAnimal} onClose={handleFormClose} />
      )}

      <div className={adminStyles.contentHeader}>
        <h2 className={adminStyles.contentTitle}>All Pets</h2>
        <button 
          className={adminStyles.addButton} 
          onClick={() => (onAddNew ? onAddNew() : setEditingAnimal({ id: 0 } as Animal))}
        >
          Add New Pet
        </button>
      </div>

      <div className={styles.grid}>
        {animals.map((animal) => (
          <div key={animal.id} className={styles.card}>
            <div className={styles.imageContainer}>
              {animal.imageUrl ? (
                <img 
                  src={animal.imageUrl} 
                  alt={animal.name}
                  className={styles.petImage}
                />
              ) : (
                <div className={styles.petEmoji}>
                  {getPetEmoji(animal.category || '')}
                </div>
              )}
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.petName}>{animal.name}</h3>
              
              <span className={styles.categoryBadge}>
                {animal.category || 'Pet'}
              </span>

              <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>
                  ${animal.price.toFixed(2)}
                </span>
              </div>

              <p className={styles.description}>{animal.description}</p>

              <div className={styles.cardFooter}>
                {animal.isPopular && (
                  <span className={styles.popularBadge}>Popular</span>
                )}
                <span className={styles.stockInfo}>
                  Stock: {animal.isStock ? 'Available' : 'Out of Stock'}
                </span>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(animal)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(animal.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimalsList;

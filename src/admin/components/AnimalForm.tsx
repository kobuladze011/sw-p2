import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { animalsApi, categoriesApi } from '../../api/apiService';
import { Animal, Category } from '../../types';
import styles from './AnimalForm.module.css';

interface AnimalFormProps {
  animal: Animal | null;
  onClose: () => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ animal, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: '',
    isPopular: false,
    isStock: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        setCategories(response.data);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (animal && animal.id && animal.id > 0) {
      setFormData({
        name: animal.name || '',
        category: animal.category || '',
        price: animal.price || 0,
        description: animal.description || '',
        imageUrl: animal.imageUrl || '',
        isPopular: animal.isPopular || false,
        isStock: animal.isStock || false,
      });
    } else {
      setFormData({
        name: '',
        category: '',
        price: 0,
        description: '',
        imageUrl: '',
        isPopular: false,
        isStock: true,
      });
    }
  }, [animal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (animal && animal.id && animal.id > 0) {
        await animalsApi.update(animal.id, formData);
        toast.success('Pet updated successfully');
      } else {
        await animalsApi.create(formData);
        toast.success('Pet created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(`Failed to ${animal?.id && animal.id > 0 ? 'update' : 'create'} pet`);
    }
  };

  if (!animal) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalHeader}>
          {animal.id && animal.id > 0 ? 'Edit Pet' : 'Add New Pet'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name *
            </label>
            <input
              id="name"
              type="text"
              className={styles.input}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category *
            </label>
            <select
              id="category"
              className={styles.select}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price (USD) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              className={styles.input}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imageUrl" className={styles.label}>
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              className={styles.input}
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description *
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={formData.isPopular}
                onChange={(e) =>
                  setFormData({ ...formData, isPopular: e.target.checked })
                }
              />
              Is Popular
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={formData.isStock}
                onChange={(e) =>
                  setFormData({ ...formData, isStock: e.target.checked })
                }
              />
              In Stock
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {animal.id && animal.id > 0 ? 'Update Pet' : 'Create Pet'}
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalForm;

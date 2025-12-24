import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoriesApi } from '../api/apiService';
import { Category } from '../types';
import styles from './Categories.module.css';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Categories</h1>

      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.categoryCard}
            onClick={() => handleCategoryClick(category.id)}
          >
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <p className={styles.categoryDescription}>{category.description}</p>
            <button className={styles.viewButton}>View Animals</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

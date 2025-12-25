import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { categoriesApi } from '../../api/apiService';
import { Category } from '../../types';
import CategoryForm from './CategoryForm';
import styles from './CategoriesList.module.css';
import adminStyles from '../AdminPanel.module.css';

type CategoriesListProps = {
  onAddNew?: () => void;
};

const CategoriesList: React.FC<CategoriesListProps> = ({ onAddNew }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await categoriesApi.delete(id);
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleFormClose = () => {
    setEditingCategory(null);
    fetchCategories();
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      {editingCategory && (
        <CategoryForm category={editingCategory} onClose={handleFormClose} />
      )}

      <div className={adminStyles.contentHeader}>
        <h2 className={adminStyles.contentTitle}>All Categories</h2>
        <button 
          className={adminStyles.addButton} 
          onClick={() => (onAddNew ? onAddNew() : setEditingCategory({ id: 0 } as Category))}
        >
          Add New Category
        </button>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <p className={styles.categoryDescription}>{category.description}</p>

            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(category)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesList;

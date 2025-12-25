import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { categoriesApi } from '../../api/apiService';
import { Category } from '../../types';
import styles from './CategoryForm.module.css';

interface CategoryFormProps {
  category: Category | null;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (category && category.id && category.id > 0) {
      setFormData({
        title: category.title || '',
        description: category.description || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (category && category.id && category.id > 0) {
        await categoriesApi.update(category.id, formData);
        toast.success('Category updated successfully');
      } else {
        await categoriesApi.create(formData);
        toast.success('Category created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(`Failed to ${category?.id && category.id > 0 ? 'update' : 'create'} category`);
    }
  };

  if (!category) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalHeader}>
          {category.id && category.id > 0 ? 'Edit Category' : 'Add New Category'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              className={styles.input}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
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

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {category.id && category.id > 0 ? 'Update Category' : 'Create Category'}
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

export default CategoryForm;

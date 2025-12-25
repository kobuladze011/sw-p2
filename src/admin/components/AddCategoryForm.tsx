import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { categoriesApi } from '../../api/apiService';
import styles from '../AdminPanel.module.css';

type Props = {
  onCancel: () => void;
  onCreated: () => void;
};

const AddCategoryForm: React.FC<Props> = ({ onCancel, onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a category title');
      return;
    }

    setSubmitting(true);
    try {
      await categoriesApi.create({
        title: title.trim(),
        description: description.trim(),
      });
      toast.success('Category created successfully');
      onCreated();
    } catch {
      toast.error('Failed to create category');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Add New Category</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="catTitle">
            Category Title
          </label>
          <input
            id="catTitle"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category title"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="catDesc">
            Description
          </label>
          <textarea
            id="catDesc"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;



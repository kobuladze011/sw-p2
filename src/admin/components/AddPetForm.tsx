import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { animalsApi, categoriesApi } from '../../api/apiService';
import { Category } from '../../types';
import styles from '../AdminPanel.module.css';

type Props = {
  onCancel: () => void;
  onCreated: () => void;
};

const GEL_PER_USD = 2.7;

const AddPetForm: React.FC<Props> = ({ onCancel, onCreated }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [priceUsd, setPriceUsd] = useState<number | ''>('');
  const [priceGel, setPriceGel] = useState<number | ''>('');
  const [stock, setStock] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const inStock = useMemo(() => {
    if (typeof stock !== 'number') return true;
    return stock > 0;
  }, [stock]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await categoriesApi.getAll();
        setCategories(res.data);
        if (res.data.length > 0) setCategory(res.data[0].title);
      } catch {
        // ignore - still allow manual category input via default select empty
      } finally {
        setLoadingCats(false);
      }
    };
    load();
  }, []);

  const handleUsdChange = (v: string) => {
    const n = v === '' ? '' : Number(v);
    setPriceUsd(n);
    if (v === '' || Number.isNaN(n)) {
      setPriceGel('');
      return;
    }
    setPriceGel(Number((n * GEL_PER_USD).toFixed(2)));
  };

  const handleGelChange = (v: string) => {
    const n = v === '' ? '' : Number(v);
    setPriceGel(n);
    if (v === '' || Number.isNaN(n)) {
      setPriceUsd('');
      return;
    }
    setPriceUsd(Number((n / GEL_PER_USD).toFixed(2)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof priceUsd !== 'number' || Number.isNaN(priceUsd)) {
      toast.error('Please enter a valid USD price');
      return;
    }
    if (!name.trim()) {
      toast.error('Please enter a pet name');
      return;
    }

    setSubmitting(true);
    try {
      await animalsApi.create({
        name: name.trim(),
        price: priceUsd,
        description: description.trim(),
        isPopular: false,
        isStock: inStock,
        category: category || undefined,
        imageUrl: imageUrl.trim() || undefined,
      });
      toast.success('Pet created successfully');
      onCreated();
    } catch (err) {
      toast.error('Failed to create pet');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>Add New Pet</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="petName">
            Pet Name
          </label>
          <input
            id="petName"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter pet name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="petCategory">
            Category
          </label>
          <select
            id="petCategory"
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loadingCats}
          >
            {categories.length === 0 ? (
              <option value="">{loadingCats ? 'Loading...' : 'No categories found'}</option>
            ) : (
              categories.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))
            )}
          </select>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="priceUsd">
              Price (USD)
            </label>
            <input
              id="priceUsd"
              className={styles.input}
              type="number"
              step="0.01"
              value={priceUsd}
              onChange={(e) => handleUsdChange(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="priceGel">
              Price (GEL)
            </label>
            <input
              id="priceGel"
              className={styles.input}
              type="number"
              step="0.01"
              value={priceGel}
              onChange={(e) => handleGelChange(e.target.value)}
              placeholder="0.00"
            />
            <div className={styles.helperText}>Auto-converts using 1 USD ≈ {GEL_PER_USD} GEL</div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            className={styles.input}
            type="number"
            value={stock}
            onChange={(e) => {
              const v = e.target.value;
              setStock(v === '' ? '' : Number(v));
            }}
            placeholder="e.g. 10"
          />
          <div className={styles.helperText}>If stock is 0, the pet will be marked Out of Stock.</div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="imageUrl">
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            className={styles.input}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="desc">
            Description
          </label>
          <textarea
            id="desc"
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
            {submitting ? 'Saving...' : 'Save Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm;



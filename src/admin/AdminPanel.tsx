import React, { useState } from 'react';
import AnimalsList from './components/AnimalsList';
import CategoriesList from './components/CategoriesList';
import AddPetForm from './components/AddPetForm';
import AddCategoryForm from './components/AddCategoryForm';
import styles from './AdminPanel.module.css';

type AdminView = 'pets' | 'categories' | 'addPet' | 'addCategory';

const AdminPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('pets');
  const [petsListKey, setPetsListKey] = useState(0);
  const [categoriesListKey, setCategoriesListKey] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          <span className={styles.headerIcon}>🐾</span>
          Pet Shop Admin Panel
        </h1>
        <p className={styles.headerSubtitle}>
          Manage your pets and categories with elegance
        </p>
      </div>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${(activeView === 'pets' || activeView === 'addPet') ? styles.active : ''}`}
          onClick={() => setActiveView('pets')}
        >
          Pets
        </button>
        <button
          className={`${styles.tab} ${(activeView === 'categories' || activeView === 'addCategory') ? styles.active : ''}`}
          onClick={() => setActiveView('categories')}
        >
          Categories
        </button>
      </div>

      {activeView === 'pets' && (
        <AnimalsList
          key={petsListKey}
          onAddNew={() => setActiveView('addPet')}
        />
      )}

      {activeView === 'categories' && (
        <CategoriesList
          key={categoriesListKey}
          onAddNew={() => setActiveView('addCategory')}
        />
      )}

      {activeView === 'addPet' && (
        <div className={styles.addPageLayout}>
          <div className={styles.backRow}>
            <button className={styles.backButton} onClick={() => setActiveView('pets')}>
              ← Back to Pets
            </button>
          </div>
          <div className={styles.formCardWrap}>
            <AddPetForm
              onCancel={() => setActiveView('pets')}
              onCreated={() => {
                setPetsListKey((k) => k + 1);
                setActiveView('pets');
              }}
            />
          </div>
        </div>
      )}

      {activeView === 'addCategory' && (
        <div className={styles.addPageLayout}>
          <div className={styles.backRow}>
            <button className={styles.backButton} onClick={() => setActiveView('categories')}>
              ← Back to Categories
            </button>
          </div>
          <div className={styles.formCardWrap}>
            <AddCategoryForm
              onCancel={() => setActiveView('categories')}
              onCreated={() => {
                setCategoriesListKey((k) => k + 1);
                setActiveView('categories');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

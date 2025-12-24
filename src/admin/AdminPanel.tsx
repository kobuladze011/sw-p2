import React, { useState } from 'react';
import AnimalsList from './components/AnimalsList';
import CategoriesList from './components/CategoriesList';
import AnimalsWithCategoriesList from './components/AnimalsWithCategoriesList';
import {
  AdminContainer,
  AdminHeader,
  AdminNav,
  NavLink,
} from './styles/AdminStyles';

type AdminView = 'animals' | 'categories' | 'relations';

const AdminPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('animals');

  return (
    <AdminContainer>
      <AdminHeader>Admin Panel</AdminHeader>

      <AdminNav>
        <NavLink
          $active={activeView === 'animals'}
          onClick={() => setActiveView('animals')}
        >
          Animals
        </NavLink>
        <NavLink
          $active={activeView === 'categories'}
          onClick={() => setActiveView('categories')}
        >
          Categories
        </NavLink>
        <NavLink
          $active={activeView === 'relations'}
          onClick={() => setActiveView('relations')}
        >
          Animals with Categories
        </NavLink>
      </AdminNav>

      {activeView === 'animals' && <AnimalsList />}
      {activeView === 'categories' && <CategoriesList />}
      {activeView === 'relations' && <AnimalsWithCategoriesList />}
    </AdminContainer>
  );
};

export default AdminPanel;

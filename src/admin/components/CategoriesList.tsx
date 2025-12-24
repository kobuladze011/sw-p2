import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { categoriesApi } from '../../api/apiService';
import { Category } from '../../types';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  Button,
} from '../styles/AdminStyles';
import CategoryForm from './CategoryForm';

const CategoriesList: React.FC = () => {
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <CategoryForm category={editingCategory} onClose={handleFormClose} />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Title</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(category)}>Edit</Button>
                <Button
                  $variant="danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoriesList;

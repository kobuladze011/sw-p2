import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { categoriesApi } from '../../api/apiService';
import { Category } from '../../types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
  ButtonGroup,
} from '../styles/AdminStyles';

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
    if (category) {
      setFormData({
        title: category.title,
        description: category.description,
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
      if (category) {
        await categoriesApi.update(category.id, formData);
        toast.success('Category updated successfully');
      } else {
        await categoriesApi.create(formData);
        toast.success('Category created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(`Failed to ${category ? 'update' : 'create'} category`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>

      <FormGroup>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description *</Label>
        <TextArea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </FormGroup>

      <ButtonGroup>
        <Button type="submit" $variant="success">
          {category ? 'Update' : 'Create'}
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default CategoryForm;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { animalsApi } from '../../api/apiService';
import { Animal } from '../../types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
  ButtonGroup,
  CheckboxLabel,
  Checkbox,
} from '../styles/AdminStyles';

interface AnimalFormProps {
  animal: Animal | null;
  onClose: () => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ animal, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    isPopular: false,
    isStock: false,
  });

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name,
        price: animal.price,
        description: animal.description,
        isPopular: animal.isPopular,
        isStock: animal.isStock,
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        description: '',
        isPopular: false,
        isStock: false,
      });
    }
  }, [animal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (animal) {
        await animalsApi.update(animal.id, formData);
        toast.success('Animal updated successfully');
      } else {
        await animalsApi.create(formData);
        toast.success('Animal created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(`Failed to ${animal ? 'update' : 'create'} animal`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{animal ? 'Edit Animal' : 'Add New Animal'}</h2>

      <FormGroup>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
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

      <FormGroup>
        <CheckboxLabel>
          <Checkbox
            checked={formData.isPopular}
            onChange={(e) =>
              setFormData({ ...formData, isPopular: e.target.checked })
            }
          />
          Is Popular
        </CheckboxLabel>
      </FormGroup>

      <FormGroup>
        <CheckboxLabel>
          <Checkbox
            checked={formData.isStock}
            onChange={(e) =>
              setFormData({ ...formData, isStock: e.target.checked })
            }
          />
          In Stock
        </CheckboxLabel>
      </FormGroup>

      <ButtonGroup>
        <Button type="submit" $variant="success">
          {animal ? 'Update' : 'Create'}
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default AnimalForm;

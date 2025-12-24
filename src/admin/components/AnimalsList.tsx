import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { animalsApi } from '../../api/apiService';
import { Animal } from '../../types';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  Button,
  Badge,
} from '../styles/AdminStyles';
import AnimalForm from './AnimalForm';

const AnimalsList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnimals = async () => {
    try {
      const response = await animalsApi.getAll();
      setAnimals(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch animals');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this animal?')) {
      return;
    }

    try {
      await animalsApi.delete(id);
      toast.success('Animal deleted successfully');
      fetchAnimals();
    } catch (error) {
      toast.error('Failed to delete animal');
    }
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
  };

  const handleFormClose = () => {
    setEditingAnimal(null);
    fetchAnimals();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AnimalForm animal={editingAnimal} onClose={handleFormClose} />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Popular</TableHeader>
            <TableHeader>In Stock</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell>{animal.id}</TableCell>
              <TableCell>{animal.name}</TableCell>
              <TableCell>${animal.price}</TableCell>
              <TableCell>{animal.description}</TableCell>
              <TableCell>
                <Badge $variant={animal.isPopular ? 'success' : 'danger'}>
                  {animal.isPopular ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge $variant={animal.isStock ? 'success' : 'danger'}>
                  {animal.isStock ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(animal)}>Edit</Button>
                <Button
                  $variant="danger"
                  onClick={() => handleDelete(animal.id)}
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

export default AnimalsList;

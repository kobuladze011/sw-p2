import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  animalsWithCategoriesApi,
  animalsApi,
  categoriesApi,
} from '../../api/apiService';
import { AnimalWithCategory, Animal, Category } from '../../types';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  Button,
  Form,
  FormGroup,
  Label,
  Select,
  ButtonGroup,
} from '../styles/AdminStyles';

const AnimalsWithCategoriesList: React.FC = () => {
  const [relations, setRelations] = useState<AnimalWithCategory[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [relationsRes, animalsRes, categoriesRes] = await Promise.all([
        animalsWithCategoriesApi.getAll(),
        animalsApi.getAll(),
        categoriesApi.getAll(),
      ]);
      setRelations(relationsRes.data);
      setAnimals(animalsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAnimal || !selectedCategory) {
      toast.error('Please select both animal and category');
      return;
    }

    try {
      await animalsWithCategoriesApi.create({
        animal_id: selectedAnimal,
        category_id: selectedCategory,
      });
      toast.success('Relation added successfully');
      setSelectedAnimal(0);
      setSelectedCategory(0);
      fetchData();
    } catch (error) {
      toast.error('Failed to add relation');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this relation?')) {
      return;
    }

    try {
      await animalsWithCategoriesApi.delete(id);
      toast.success('Relation deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete relation');
    }
  };

  const getAnimalName = (animalId: number): string => {
    const animal = animals.find((a) => a.id === animalId);
    return animal ? animal.name : 'Unknown';
  };

  const getCategoryTitle = (categoryId: number): string => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.title : 'Unknown';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form onSubmit={handleAdd}>
        <h2>Add Animal to Category</h2>

        <FormGroup>
          <Label htmlFor="animal">Animal *</Label>
          <Select
            id="animal"
            value={selectedAnimal}
            onChange={(e) => setSelectedAnimal(parseInt(e.target.value))}
            required
          >
            <option value={0}>Select an animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category *</Label>
          <Select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
            required
          >
            <option value={0}>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" $variant="success">
            Add Relation
          </Button>
        </ButtonGroup>
      </Form>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Animal</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {relations.map((relation) => (
            <TableRow key={relation.id}>
              <TableCell>{relation.id}</TableCell>
              <TableCell>{getAnimalName(relation.animal_id)}</TableCell>
              <TableCell>{getCategoryTitle(relation.category_id)}</TableCell>
              <TableCell>
                <Button
                  $variant="danger"
                  onClick={() => handleDelete(relation.id)}
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

export default AnimalsWithCategoriesList;

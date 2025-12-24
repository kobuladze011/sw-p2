import axios from 'axios';
import { Animal, Category, AnimalWithCategory } from '../types';
import {
  mockAnimals,
  mockCategories,
  mockAnimalsWithCategories,
  getAnimalsByCategory,
} from './mockData';

// Base URL for your backend API (update this with your actual backend URL)
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your Swagger backend URL

// Set to true to use mock data (for testing without backend)
const USE_MOCK_DATA = true; // Change to false when your backend is ready

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock delay to simulate network request
const mockDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Animals API
export const animalsApi = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return { data: [...mockAnimals] };
    }
    return api.get<Animal[]>('/animals');
  },
  getById: async (id: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const animal = mockAnimals.find((a) => a.id === id);
      if (!animal) throw new Error('Animal not found');
      return { data: animal };
    }
    return api.get<Animal>(`/animals/${id}`);
  },
  create: async (animal: Omit<Animal, 'id'>) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const newAnimal = {
        ...animal,
        id: Math.max(...mockAnimals.map((a) => a.id)) + 1,
      };
      mockAnimals.push(newAnimal);
      return { data: newAnimal };
    }
    return api.post<Animal>('/animals', animal);
  },
  update: async (id: number, animal: Partial<Animal>) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const index = mockAnimals.findIndex((a) => a.id === id);
      if (index === -1) throw new Error('Animal not found');
      mockAnimals[index] = { ...mockAnimals[index], ...animal };
      return { data: mockAnimals[index] };
    }
    return api.put<Animal>(`/animals/${id}`, animal);
  },
  delete: async (id: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const index = mockAnimals.findIndex((a) => a.id === id);
      if (index !== -1) {
        mockAnimals.splice(index, 1);
      }
      return { data: null };
    }
    return api.delete(`/animals/${id}`);
  },
  decreaseStock: async (id: number, quantity: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const animal = mockAnimals.find((a) => a.id === id);
      if (animal) {
        // In a real backend, you'd decrease quantity. Here we just mark as out of stock
        animal.isStock = false;
        return { data: animal };
      }
      return { data: null };
    }
    return api.patch(`/animals/${id}/stock`, { quantity });
  },
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return { data: [...mockCategories] };
    }
    return api.get<Category[]>('/categories');
  },
  getById: async (id: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const category = mockCategories.find((c) => c.id === id);
      if (!category) throw new Error('Category not found');
      return { data: category };
    }
    return api.get<Category>(`/categories/${id}`);
  },
  create: async (category: Omit<Category, 'id'>) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const newCategory = {
        ...category,
        id: Math.max(...mockCategories.map((c) => c.id)) + 1,
      };
      mockCategories.push(newCategory);
      return { data: newCategory };
    }
    return api.post<Category>('/categories', category);
  },
  update: async (id: number, category: Partial<Category>) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const index = mockCategories.findIndex((c) => c.id === id);
      if (index === -1) throw new Error('Category not found');
      mockCategories[index] = { ...mockCategories[index], ...category };
      return { data: mockCategories[index] };
    }
    return api.put<Category>(`/categories/${id}`, category);
  },
  delete: async (id: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const index = mockCategories.findIndex((c) => c.id === id);
      if (index !== -1) {
        mockCategories.splice(index, 1);
      }
      return { data: null };
    }
    return api.delete(`/categories/${id}`);
  },
};

// Animals with Categories API
export const animalsWithCategoriesApi = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return { data: [...mockAnimalsWithCategories] };
    }
    return api.get<AnimalWithCategory[]>('/animals-with-categories');
  },
  getById: async (id: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const relation = mockAnimalsWithCategories.find((r) => r.id === id);
      if (!relation) throw new Error('Relation not found');
      return { data: relation };
    }
    return api.get<AnimalWithCategory>(`/animals-with-categories/${id}`);
  },
  create: async (data: Omit<AnimalWithCategory, 'id'>) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const newRelation = {
        ...data,
        id: Math.max(...mockAnimalsWithCategories.map((r) => r.id)) + 1,
      };
      mockAnimalsWithCategories.push(newRelation);
      return { data: newRelation };
    }
    return api.post<AnimalWithCategory>('/animals-with-categories', data);
  },
  delete: async (id: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      const index = mockAnimalsWithCategories.findIndex((r) => r.id === id);
      if (index !== -1) {
        mockAnimalsWithCategories.splice(index, 1);
      }
      return { data: null };
    }
    return api.delete(`/animals-with-categories/${id}`);
  },
  getAnimalsByCategory: async (categoryId: number) => {
    if (USE_MOCK_DATA) {
      await mockDelay();
      return { data: getAnimalsByCategory(categoryId) };
    }
    return api.get<Animal[]>(`/categories/${categoryId}/animals`);
  },
};

// Currency conversion
export const currencyApi = {
  getRate: async (from: string, to: string): Promise<number> => {
    try {
      // Using BOG API
      const response = await axios.get(
        `https://api.bog.ge/docs/en/${to}/${from}/1`
      );
      return response.data.rate || 1;
    } catch (error) {
      console.error('Currency conversion error:', error);
      // Fallback to hardcoded rate if API fails
      if (from === 'USD' && to === 'GEL') return 2.7;
      if (from === 'GEL' && to === 'USD') return 0.37;
      return 1;
    }
  },
};

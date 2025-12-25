import axios from 'axios';
import { Animal, Category, AnimalWithCategory } from '../types';
import {
  mockAnimals as initialMockAnimals,
  mockCategories as initialMockCategories,
  mockAnimalsWithCategories as initialMockAnimalsWithCategories,
  getAnimalsByCategory,
} from './mockData';
import { env } from '../config/env';

// API Configuration from environment variables
const API_BASE_URL = env.apiBaseUrl;
const USE_MOCK_DATA = env.useMockData;
const STORAGE_KEYS = env.storageKeys;

// Load data from localStorage or use initial mock data
const loadFromStorage = <T>(key: string, initial: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  } catch {
    return initial;
  }
};

// Save data to localStorage
const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Initialize with localStorage or initial data
const mockAnimals = loadFromStorage(STORAGE_KEYS.animals, initialMockAnimals);
const mockCategories = loadFromStorage(STORAGE_KEYS.categories, initialMockCategories);
const mockAnimalsWithCategories = loadFromStorage(STORAGE_KEYS.relations, initialMockAnimalsWithCategories);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock delay to simulate network request
const mockDelay = (ms: number = env.mockApiDelay) =>
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
        id: Math.max(...mockAnimals.map((a) => a.id), 0) + 1,
      };
      mockAnimals.push(newAnimal);
      saveToStorage(STORAGE_KEYS.animals, mockAnimals);
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
      saveToStorage(STORAGE_KEYS.animals, mockAnimals);
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
        saveToStorage(STORAGE_KEYS.animals, mockAnimals);
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
        id: Math.max(...mockCategories.map((c) => c.id), 0) + 1,
      };
      mockCategories.push(newCategory);
      saveToStorage(STORAGE_KEYS.categories, mockCategories);
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
      saveToStorage(STORAGE_KEYS.categories, mockCategories);
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
        saveToStorage(STORAGE_KEYS.categories, mockCategories);
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
        id: Math.max(...mockAnimalsWithCategories.map((r) => r.id), 0) + 1,
      };
      mockAnimalsWithCategories.push(newRelation);
      saveToStorage(STORAGE_KEYS.relations, mockAnimalsWithCategories);
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
        saveToStorage(STORAGE_KEYS.relations, mockAnimalsWithCategories);
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
      // Using BOG API from environment config
      const response = await axios.get(
        `${env.currencyApiUrl}/${to}/${from}/1`
      );
      return response.data.rate || 1;
    } catch (error) {
      console.error('Currency conversion error:', error);
      // Fallback to environment-configured rates if API fails
      if (from === 'USD' && to === 'GEL') return env.defaultCurrencyRates.usdToGel;
      if (from === 'GEL' && to === 'USD') return env.defaultCurrencyRates.gelToUsd;
      return 1;
    }
  },
};

// Helper to reset mock data to initial state (useful for development/testing)
export const resetMockData = () => {
  localStorage.removeItem(STORAGE_KEYS.animals);
  localStorage.removeItem(STORAGE_KEYS.categories);
  localStorage.removeItem(STORAGE_KEYS.relations);
  window.location.reload();
};

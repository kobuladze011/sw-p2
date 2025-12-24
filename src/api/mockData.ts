import { Animal, Category, AnimalWithCategory } from '../types';

export const mockAnimals: Animal[] = [
  {
    id: 1,
    name: 'Rex',
    price: 750,
    description: 'Friendly and loyal dog, great with families',
    isPopular: true,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=400&fit=crop',
    category: 'Dog',
  },
  {
    id: 2,
    name: 'Mittens',
    price: 500,
    description: 'Beautiful tabby cat with playful personality',
    isPopular: true,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&h=400&fit=crop',
    category: 'Cat',
  },
  {
    id: 3,
    name: 'Polly',
    price: 300,
    description: 'Colorful and talkative parrot. She can already say a few words and loves to whistle.',
    isPopular: true,
    isStock: false,
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=400&fit=crop',
    category: 'Bird',
  },
  {
    id: 4,
    name: 'Buddy',
    price: 850,
    description: 'Energetic and friendly dog, loves to play',
    isPopular: true,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop',
    category: 'Dog',
  },
  {
    id: 5,
    name: 'Kiwi',
    price: 450,
    description: 'Unique and intelligent bird with beautiful plumage',
    isPopular: false,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=500&h=400&fit=crop',
    category: 'Bird',
  },
  {
    id: 6,
    name: 'Luna',
    price: 700,
    description: 'Elegant cat with stunning blue eyes and soft fur',
    isPopular: true,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10c1dd7aa38c?w=500&h=400&fit=crop',
    category: 'Cat',
  },
  {
    id: 7,
    name: 'Charlie',
    price: 1200,
    description: 'Stunning Macaw with vibrant colors. He can speak many phrases and is very sociable.',
    isPopular: true,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500&h=400&fit=crop',
    category: 'Bird',
  },
  {
    id: 8,
    name: 'Max',
    price: 950,
    description: 'Playful and affectionate dog, perfect family companion',
    isPopular: true,
    isStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&h=400&fit=crop',
    category: 'Dog',
  },
];

export const mockCategories: Category[] = [
  {
    id: 1,
    title: 'Dogs',
    description: 'All types of dogs - loyal and friendly companions',
  },
  {
    id: 2,
    title: 'Cats',
    description: 'Various cat breeds - independent and loving pets',
  },
  {
    id: 3,
    title: 'Birds',
    description: 'Colorful and intelligent feathered friends',
  },
  {
    id: 4,
    title: 'Small Pets',
    description: 'Perfect for small spaces - hamsters, rabbits, and more',
  },
  {
    id: 5,
    title: 'Fish',
    description: 'Aquatic pets for peaceful home decoration',
  },
];

export const mockAnimalsWithCategories: AnimalWithCategory[] = [
  { id: 1, animal_id: 1, category_id: 1 }, // Golden Retriever - Dogs
  { id: 2, animal_id: 6, category_id: 1 }, // Labrador - Dogs
  { id: 3, animal_id: 2, category_id: 2 }, // Persian Cat - Cats
  { id: 4, animal_id: 7, category_id: 2 }, // Siamese Cat - Cats
  { id: 5, animal_id: 3, category_id: 3 }, // Parrot - Birds
  { id: 6, animal_id: 4, category_id: 4 }, // Hamster - Small Pets
  { id: 7, animal_id: 8, category_id: 4 }, // Rabbit - Small Pets
  { id: 8, animal_id: 5, category_id: 5 }, // Goldfish - Fish
];

// Helper function to get animals by category
export const getAnimalsByCategory = (categoryId: number): Animal[] => {
  const animalIds = mockAnimalsWithCategories
    .filter((rel) => rel.category_id === categoryId)
    .map((rel) => rel.animal_id);

  return mockAnimals.filter((animal) => animalIds.includes(animal.id));
};


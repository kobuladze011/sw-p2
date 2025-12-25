# 📡 API Service - დეტალური დოკუმენტაცია

## 📋 მიმოხილვა

`apiService.ts` არის პროექტის ცენტრალური API სერვისის ფაილი, რომელიც მართავს ყველა HTTP მოთხოვნას Backend-თან ან Mock Data-სთან. ეს ფაილი მდებარეობს `src/api/apiService.ts` და წარმოადგენს Data Layer-ს აპლიკაციაში.

## 🎯 მთავარი დანიშნულება

1. **Centralized API Management** - ერთი ადგილი ყველა API მოთხოვნისთვის
2. **Mock/Real Backend Toggle** - მარტივი გადართვა Mock და Real Backend-ს შორის
3. **LocalStorage Persistence** - მონაცემების შენახვა ბრაუზერში
4. **Type Safety** - TypeScript ტიპების გამოყენება
5. **Error Handling** - ცენტრალიზებული შეცდომების დამუშავება

## 📁 ფაილის სტრუქტურა

```typescript
src/api/apiService.ts
├── Imports & Configuration
├── Storage Helper Functions
├── Axios Instance
├── Animals API (animalsApi)
├── Categories API (categoriesApi)
├── Animals-Categories Relations API
├── Currency API (currencyApi)
└── Helper Functions (resetMockData)
```

## 🔧 კონფიგურაცია

### Environment Variables

```typescript
import { env } from '../config/env';

const API_BASE_URL = env.apiBaseUrl;        // http://localhost:3000/api
const USE_MOCK_DATA = env.useMockData;      // true/false
const STORAGE_KEYS = env.storageKeys;       // LocalStorage keys
```

### Axios Instance

```typescript
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**მახასიათებლები**:
- Base URL კონფიგურირებული environment variable-დან
- JSON Content-Type header-ი ყველა მოთხოვნისთვის
- მზადაა interceptor-ების დამატებისთვის (authentication და სხვა)

## 💾 LocalStorage Persistence

### loadFromStorage()

```typescript
const loadFromStorage = <T>(key: string, initial: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  } catch {
    return initial;
  }
};
```

**დანიშნულება**: მონაცემების ჩატვირთვა LocalStorage-დან

**პარამეტრები**:
- `key` - LocalStorage-ის key
- `initial` - საწყისი default მონაცემები

**დაბრუნება**: მონაცემები LocalStorage-დან ან initial data

### saveToStorage()

```typescript
const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};
```

**დანიშნულება**: მონაცემების შენახვა LocalStorage-ში

**პარამეტრები**:
- `key` - LocalStorage-ის key
- `data` - შესანახი მონაცემები

## 🐾 Animals API (animalsApi)

### getAll()

```typescript
animalsApi.getAll(): Promise<{ data: Animal[] }>
```

**აღწერა**: ყველა ცხოველის მიღება

**Mock მოქმედება**:
```typescript
if (USE_MOCK_DATA) {
  await mockDelay();                    // 300ms დაყოვნება
  return { data: [...mockAnimals] };    // LocalStorage-დან მონაცემები
}
```

**Real Backend**:
```typescript
return api.get<Animal[]>('/animals');   // GET http://localhost:3000/api/animals
```

**გამოყენების მაგალითი**:
```typescript
import { animalsApi } from './api/apiService';

const fetchAnimals = async () => {
  try {
    const response = await animalsApi.getAll();
    console.log(response.data); // Animal[]
  } catch (error) {
    console.error('Error fetching animals:', error);
  }
};
```

### getById()

```typescript
animalsApi.getById(id: number): Promise<{ data: Animal }>
```

**აღწერა**: კონკრეტული ცხოველის მიღება ID-ით

**პარამეტრები**:
- `id` (number) - ცხოველის ID

**Mock მოქმედება**:
```typescript
const animal = mockAnimals.find((a) => a.id === id);
if (!animal) throw new Error('Animal not found');
return { data: animal };
```

**Real Backend**:
```typescript
return api.get<Animal>(`/animals/${id}`);  // GET http://localhost:3000/api/animals/1
```

**გამოყენების მაგალითი**:
```typescript
const animal = await animalsApi.getById(1);
console.log(animal.data); // { id: 1, name: "Rex", ... }
```

### create()

```typescript
animalsApi.create(animal: Omit<Animal, 'id'>): Promise<{ data: Animal }>
```

**აღწერა**: ახალი ცხოველის დამატება

**პარამეტრები**:
- `animal` - ცხოველის ობიექტი (ID გარეშე)

**Mock მოქმედება**:
```typescript
const newAnimal = {
  ...animal,
  id: Math.max(...mockAnimals.map((a) => a.id), 0) + 1,  // ახალი ID
};
mockAnimals.push(newAnimal);                              // დამატება array-ში
saveToStorage(STORAGE_KEYS.animals, mockAnimals);         // შენახვა LocalStorage-ში
return { data: newAnimal };
```

**Real Backend**:
```typescript
return api.post<Animal>('/animals', animal);  // POST http://localhost:3000/api/animals
```

**გამოყენების მაგალითი**:
```typescript
const newPet = {
  name: "Buddy",
  category: "Dog",
  price: 500,
  description: "Friendly dog",
  isPopular: true,
  isStock: true,
};

const created = await animalsApi.create(newPet);
console.log(created.data); // { id: 9, name: "Buddy", ... }
```

### update()

```typescript
animalsApi.update(id: number, animal: Partial<Animal>): Promise<{ data: Animal }>
```

**აღწერა**: ცხოველის რედაქტირება

**პარამეტრები**:
- `id` (number) - ცხოველის ID
- `animal` (Partial<Animal>) - განსაახლებელი ველები

**Mock მოქმედება**:
```typescript
const index = mockAnimals.findIndex((a) => a.id === id);
if (index === -1) throw new Error('Animal not found');
mockAnimals[index] = { ...mockAnimals[index], ...animal };  // Merge
saveToStorage(STORAGE_KEYS.animals, mockAnimals);
return { data: mockAnimals[index] };
```

**Real Backend**:
```typescript
return api.put<Animal>(`/animals/${id}`, animal);  // PUT http://localhost:3000/api/animals/1
```

**გამოყენების მაგალითი**:
```typescript
const updated = await animalsApi.update(1, {
  price: 600,
  isPopular: false,
});
console.log(updated.data); // განახლებული ობიექტი
```

### delete()

```typescript
animalsApi.delete(id: number): Promise<{ data: null }>
```

**აღწერა**: ცხოველის წაშლა

**პარამეტრები**:
- `id` (number) - ცხოველის ID

**Mock მოქმედება**:
```typescript
const index = mockAnimals.findIndex((a) => a.id === id);
if (index !== -1) {
  mockAnimals.splice(index, 1);                      // წაშლა array-დან
  saveToStorage(STORAGE_KEYS.animals, mockAnimals);  // შენახვა LocalStorage-ში
}
```

**Real Backend**:
```typescript
return api.delete(`/animals/${id}`);  // DELETE http://localhost:3000/api/animals/1
```

**გამოყენების მაგალითი**:
```typescript
await animalsApi.delete(1);
console.log('Animal deleted successfully');
```

### decreaseStock()

```typescript
animalsApi.decreaseStock(id: number, quantity: number): Promise<{ data: Animal | null }>
```

**აღწერა**: მარაგის განახლება შეკვეთის შემდეგ

**პარამეტრები**:
- `id` (number) - ცხოველის ID
- `quantity` (number) - რაოდენობა

**Mock მოქმედება**:
```typescript
const animal = mockAnimals.find((a) => a.id === id);
if (animal) {
  animal.isStock = false;  // Mark as out of stock
  return { data: animal };
}
```

**Real Backend**:
```typescript
return api.patch(`/animals/${id}/stock`, { quantity });  // PATCH
```

## 📁 Categories API (categoriesApi)

### getAll()

```typescript
categoriesApi.getAll(): Promise<{ data: Category[] }>
```

**აღწერა**: ყველა კატეგორიის მიღება

**გამოყენება**: კატეგორიების dropdown-ში, ფილტრაციისთვის

### getById()

```typescript
categoriesApi.getById(id: number): Promise<{ data: Category }>
```

**აღწერა**: კონკრეტული კატეგორიის მიღება

### create()

```typescript
categoriesApi.create(category: Omit<Category, 'id'>): Promise<{ data: Category }>
```

**აღწერა**: ახალი კატეგორიის დამატება

**გამოყენების მაგალითი**:
```typescript
const newCategory = {
  title: "Reptiles",
  description: "Cold-blooded pets",
};

const created = await categoriesApi.create(newCategory);
console.log(created.data); // { id: 6, title: "Reptiles", ... }
```

### update()

```typescript
categoriesApi.update(id: number, category: Partial<Category>): Promise<{ data: Category }>
```

**აღწერა**: კატეგორიის რედაქტირება

### delete()

```typescript
categoriesApi.delete(id: number): Promise<{ data: null }>
```

**აღწერა**: კატეგორიის წაშლა

## 🔗 Animals-Categories Relations API

### getAll()

```typescript
animalsWithCategoriesApi.getAll(): Promise<{ data: AnimalWithCategory[] }>
```

**აღწერა**: ცხოველებისა და კატეგორიების ურთიერთობების მიღება

### getAnimalsByCategory()

```typescript
animalsWithCategoriesApi.getAnimalsByCategory(categoryId: number): Promise<{ data: Animal[] }>
```

**აღწერა**: კონკრეტული კატეგორიის ცხოველების მიღება

**გამოყენების მაგალითი**:
```typescript
// ყველა ძაღლის მიღება (categoryId: 1)
const dogs = await animalsWithCategoriesApi.getAnimalsByCategory(1);
console.log(dogs.data); // [{ id: 1, name: "Rex", ... }, ...]
```

## 💱 Currency API (currencyApi)

### getRate()

```typescript
currencyApi.getRate(from: string, to: string): Promise<number>
```

**აღწერა**: ვალუტის კურსის მიღება Bank of Georgia API-დან

**პარამეტრები**:
- `from` (string) - საწყისი ვალუტა (USD, GEL)
- `to` (string) - სამიზნე ვალუტა (USD, GEL)

**მოქმედება**:
```typescript
try {
  const response = await axios.get(
    `${env.currencyApiUrl}/${to}/${from}/1`
  );
  return response.data.rate || 1;
} catch (error) {
  // Fallback to environment-configured rates
  if (from === 'USD' && to === 'GEL') return env.defaultCurrencyRates.usdToGel;
  if (from === 'GEL' && to === 'USD') return env.defaultCurrencyRates.gelToUsd;
  return 1;
}
```

**მახასიათებლები**:
- **Real-time**: იყენებს ბანკის რეალურ API-ს
- **Fallback**: თუ API არ მუშაობს, იყენებს default კურსს
- **Error Handling**: ავტომატური fallback შეცდომის შემთხვევაში

**გამოყენების მაგალითი**:
```typescript
// USD → GEL
const rate = await currencyApi.getRate('USD', 'GEL');
console.log(rate); // 2.7 (approximation)

const priceInGel = 100 * rate;
console.log(priceInGel); // 270

// GEL → USD
const reverseRate = await currencyApi.getRate('GEL', 'USD');
const priceInUsd = 270 * reverseRate;
console.log(priceInUsd); // 100
```

## 🔄 Mock Data vs Real Backend

### Mock Data Mode (Development)

**Enabled when**: `VITE_USE_MOCK_DATA=true` in `.env`

**მახასიათებლები**:
- ✅ არ სჭირდება Backend სერვერი
- ✅ მონაცემები ინახება LocalStorage-ში
- ✅ ცვლილებები პერსისტენტურია page reload-ის შემდეგაც
- ✅ 300ms დაყოვნება რეალური API-ის იმიტაციისთვის
- ✅ სწრაფი დეველოპმენტი და ტესტირება

**როგორ მუშაობს**:
```typescript
if (USE_MOCK_DATA) {
  await mockDelay(300);                           // რეალური API-ის სიმულაცია
  return { data: [...mockAnimals] };              // LocalStorage-დან
}
```

### Real Backend Mode (Production)

**Enabled when**: `VITE_USE_MOCK_DATA=false` in `.env`

**მახასიათებლები**:
- ✅ ყველა მოთხოვნა Backend-ზე მიდის
- ✅ რეალური Database persistence
- ✅ Authentication და Authorization
- ✅ ვალიდაცია Backend-ზე
- ✅ Production-ready

**როგორ მუშაობს**:
```typescript
return api.get<Animal[]>('/animals');  // HTTP მოთხოვნა Backend-ზე
```

## 🛠️ Helper Functions

### mockDelay()

```typescript
const mockDelay = (ms: number = env.mockApiDelay) =>
  new Promise((resolve) => setTimeout(resolve, ms));
```

**დანიშნულება**: რეალური API-ის დაყოვნების სიმულაცია

**დეფოლტი**: 300ms (კონფიგურირებადია `.env`-ში)

### resetMockData()

```typescript
export const resetMockData = () => {
  localStorage.removeItem(STORAGE_KEYS.animals);
  localStorage.removeItem(STORAGE_KEYS.categories);
  localStorage.removeItem(STORAGE_KEYS.relations);
  window.location.reload();
};
```

**დანიშნულება**: მონაცემების რესეტი საწყის მდგომარეობაზე

**გამოყენება**:
```typescript
import { resetMockData } from './api/apiService';

// ბრაუზერის console-ში:
resetMockData();  // წაშლის LocalStorage მონაცემებს და გადატვირთავს გვერდს
```

## 📊 Data Flow (მონაცემთა ნაკადი)

### Create Operation (მაგალითი)

```
1. Component → animalsApi.create(newPet)
              ↓
2. apiService checks USE_MOCK_DATA
              ↓
3a. If Mock:                    3b. If Real:
    - Generate new ID              - Send POST to Backend
    - Add to mockAnimals           - Receive response
    - saveToStorage()              - Return data
    - Return data                  
              ↓
4. Component receives response
              ↓
5. Update UI / Redux Store
```

### Read Operation (მაგალითი)

```
1. Component → animalsApi.getAll()
              ↓
2. apiService checks USE_MOCK_DATA
              ↓
3a. If Mock:                    3b. If Real:
    - mockDelay(300ms)             - Send GET to Backend
    - loadFromStorage()            - Receive response
    - Return data                  - Return data
              ↓
4. Component receives response
              ↓
5. Render data in UI
```

## 🎯 გამოყენების Best Practices

### 1. Error Handling

```typescript
const fetchAnimals = async () => {
  try {
    const response = await animalsApi.getAll();
    setAnimals(response.data);
  } catch (error) {
    console.error('Failed to fetch animals:', error);
    toast.error('Failed to load pets');
  }
};
```

### 2. Loading States

```typescript
const [loading, setLoading] = useState(true);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await animalsApi.getAll();
    setAnimals(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
```

### 3. TypeScript Types

```typescript
import { Animal } from '../types';
import { animalsApi } from '../api/apiService';

const [animals, setAnimals] = useState<Animal[]>([]);

const fetchAnimals = async () => {
  const response = await animalsApi.getAll();
  setAnimals(response.data); // Type-safe
};
```

### 4. Async/Await

```typescript
// ✅ რეკომენდებული
const handleCreate = async () => {
  const newAnimal = await animalsApi.create(formData);
  console.log(newAnimal.data);
};

// ❌ თავიდან აცილება
animalsApi.create(formData).then(response => {
  console.log(response.data);
});
```

## 🔐 Security & Authentication

### მომავალი გაუმჯობესებები

```typescript
// Authentication Interceptor (მაგალითი)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(env.storageKeys.authToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (შეცდომების დამუშავება)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 📈 Performance Optimization

### 1. Request Caching (მაგალითი)

```typescript
const cache = new Map();

export const animalsApi = {
  getAll: async () => {
    if (cache.has('animals')) {
      return { data: cache.get('animals') };
    }
    
    const response = await api.get<Animal[]>('/animals');
    cache.set('animals', response.data);
    return response;
  },
};
```

### 2. Request Cancellation

```typescript
import axios from 'axios';

const controller = new AbortController();

const fetchAnimals = async () => {
  try {
    const response = await api.get('/animals', {
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request cancelled');
    }
  }
};

// Cancel request
controller.abort();
```

## 🧪 Testing

### Unit Test მაგალითი

```typescript
import { animalsApi } from './apiService';

describe('animalsApi', () => {
  test('getAll returns all animals', async () => {
    const response = await animalsApi.getAll();
    expect(response.data).toBeInstanceOf(Array);
  });

  test('getById returns specific animal', async () => {
    const response = await animalsApi.getById(1);
    expect(response.data.id).toBe(1);
  });

  test('create adds new animal', async () => {
    const newAnimal = {
      name: 'Test Pet',
      category: 'Dog',
      price: 500,
      description: 'Test',
      isPopular: false,
      isStock: true,
    };
    
    const response = await animalsApi.create(newAnimal);
    expect(response.data.name).toBe('Test Pet');
    expect(response.data.id).toBeDefined();
  });
});
```

## 📚 დამატებითი რესურსები

- **Environment Variables**: `.env` კონფიგურაცია
- **Type Definitions**: `src/types/index.ts`
- **Mock Data**: `src/api/mockData.ts`
- **API Endpoints**: `DOCUMENT.md`

## ⚠️ მნიშვნელოვანი შენიშვნები

1. **LocalStorage Limits**: 
   - მაქსიმუმ 5-10MB სივრცე
   - არ გამოიყენო დიდი მონაცემებისთვის

2. **Mock Data Persistence**:
   - მონაცემები ინახება მხოლოდ ბრაუზერში
   - სხვა ბრაუზერში/კომპიუტერზე არ გადმოვა

3. **Type Safety**:
   - ყოველთვის გამოიყენე TypeScript ტიპები
   - არ გამოიყენო `any` ტიპი

4. **Error Handling**:
   - ყოველთვის დაამატე try-catch
   - გამოიყენე toast შეტყობინებები მომხმარებლისთვის

---

**ავტორი**: Software Engineering Project  
**ფაილი**: `src/api/apiService.ts`  
**ვერსია**: 1.0.0  
**განახლების თარიღი**: December 2025


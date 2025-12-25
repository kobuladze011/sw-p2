# 🐾 Pet Shop - პროექტის დოკუმენტაცია

## 📋 პროექტის მიმოხილვა

Pet Shop არის თანამედროვე ვებ აპლიკაცია, რომელიც შექმნილია React-ის და TypeScript-ის გამოყენებით. ეს არის სრულფუნქციური ელექტრონული კომერციის პლატფორma შინაური ცხოველების შესაძენად, ადმინისტრაციული პანელით და მომხმარებლის მოსახერხებელი ინტერფეისით.

## 🛠️ ტექნოლოგიური სტეკი

### Frontend
- **React 18** - UI ბიბლიოთეკა
- **TypeScript** - ტიპიზირებული JavaScript
- **Redux Toolkit** - სთეითის მენეჯმენტი (კალათა, Wishlist)
- **React Router v6** - ნავიგაცია
- **Axios** - HTTP მოთხოვნები
- **CSS Modules** - კომპონენტ-სკოპული სტილები
- **React Toastify** - შეტყობინებები

### API და მონაცემები
- **Mock Data** - LocalStorage-ის გამოყენებით დატა პერსისტენსი
- **REST API სტრუქტურა** - მზადაა Backend ინტეგრაციისთვის

## 📁 პროექტის სტრუქტურა

```
sw-p2/
├── src/
│   ├── admin/                      # ადმინისტრაციული პანელი
│   │   ├── components/             # ადმინის კომპონენტები
│   │   │   ├── AnimalsList.tsx    # ცხოველების სია
│   │   │   ├── AnimalForm.tsx     # რედაქტირების ფორმა
│   │   │   ├── AddPetForm.tsx     # ახალი ცხოველის დამატება
│   │   │   ├── CategoriesList.tsx # კატეგორიების სია
│   │   │   ├── CategoryForm.tsx   # კატეგორიის რედაქტირება
│   │   │   └── AddCategoryForm.tsx # ახალი კატეგორიის დამატება
│   │   └── AdminPanel.tsx          # მთავარი ადმინ კომპონენტი
│   │
│   ├── api/                        # API ინტეგრაცია
│   │   ├── apiService.ts          # API სერვისები და Endpoints
│   │   └── mockData.ts            # Mock მონაცემები
│   │
│   ├── components/                 # UI კომპონენტები
│   │   ├── Navbar.tsx             # ნავიგაციის ბარი
│   │   ├── Footer.tsx             # Footer
│   │   ├── HeroCarousel.tsx       # მთავარი სლაიდერი
│   │   └── CurrencyToggle.tsx     # ვალუტის გადამრთველი (USD/GEL)
│   │
│   ├── pages/                      # გვერდები
│   │   ├── Home.tsx               # მთავარი გვერდი
│   │   ├── Animals.tsx            # ცხოველების სია ფილტრებით
│   │   ├── AnimalDetail.tsx       # ცხოველის დეტალური ინფორმაცია
│   │   ├── Categories.tsx         # კატეგორიების სია
│   │   ├── Cart.tsx               # კალათა
│   │   ├── Wishlist.tsx           # ფავორიტები
│   │   └── Checkout.tsx           # შეკვეთის გვერდი
│   │
│   ├── store/                      # Redux Store
│   │   ├── store.ts               # Store კონფიგურაცია
│   │   └── cartSlice.ts           # კალათის სთეითი
│   │
│   ├── types/                      # TypeScript ტიპები
│   │   └── index.ts               # ინტერფეისები
│   │
│   ├── App.tsx                     # მთავარი აპლიკაცია
│   ├── main.tsx                    # Entry Point
│   └── index.css                   # გლობალური სტილები
│
├── public/                         # სტატიკური ფაილები
├── package.json                    # Dependencies
└── vite.config.ts                  # Vite კონფიგურაცია

```

## 🔌 API Endpoints

**Base URL**: `http://localhost:3000/api` (კონფიგურირებადია `.env` ფაილში: `VITE_API_BASE_URL`)

### Animals (ცხოველები) API

#### 1. **GET** `http://localhost:3000/api/animals`
- **აღწერა**: ყველა ცხოველის მიღება
- **URL**: `${VITE_API_BASE_URL}/animals`
- **Method**: `GET`
- **პასუხი**: `Animal[]`
- **გამოყენება**: მთავარი გვერდზე, ცხოველების სიაში

#### 2. **GET** `http://localhost:3000/api/animals/:id`
- **აღწერა**: კონკრეტული ცხოველის მიღება ID-ით
- **URL**: `${VITE_API_BASE_URL}/animals/{id}`
- **Method**: `GET`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/animals/1`
- **პასუხი**: `Animal`
- **გამოყენება**: დეტალური გვერდი

#### 3. **POST** `http://localhost:3000/api/animals`
- **აღწერა**: ახალი ცხოველის დამატება
- **URL**: `${VITE_API_BASE_URL}/animals`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```typescript
  {
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl?: string;
    isPopular: boolean;
    isStock: boolean;
  }
  ```
- **პასუხი**: `Animal` (ახალი ID-ით)
- **გამოყენება**: ადმინ პანელი

#### 4. **PUT** `http://localhost:3000/api/animals/:id`
- **აღწერა**: ცხოველის რედაქტირება
- **URL**: `${VITE_API_BASE_URL}/animals/{id}`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/animals/1`
- **Body**: `Partial<Animal>`
- **პასუხი**: `Animal` (განახლებული)
- **გამოყენება**: ადმინ პანელი

#### 5. **DELETE** `http://localhost:3000/api/animals/:id`
- **აღწერა**: ცხოველის წაშლა
- **URL**: `${VITE_API_BASE_URL}/animals/{id}`
- **Method**: `DELETE`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/animals/1`
- **პასუხი**: `null`
- **გამოყენება**: ადმინ პანელი

#### 6. **PATCH** `http://localhost:3000/api/animals/:id/stock`
- **აღწერა**: მარაგის განახლება
- **URL**: `${VITE_API_BASE_URL}/animals/{id}/stock`
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/animals/1/stock`
- **Body**: `{ quantity: number }`
- **გამოყენება**: შეკვეთის დროს

### Categories (კატეგორიები) API

#### 1. **GET** `http://localhost:3000/api/categories`
- **აღწერა**: ყველა კატეგორიის მიღება
- **URL**: `${VITE_API_BASE_URL}/categories`
- **Method**: `GET`
- **პასუხი**: `Category[]`

#### 2. **GET** `http://localhost:3000/api/categories/:id`
- **აღწერა**: კონკრეტული კატეგორიის მიღება
- **URL**: `${VITE_API_BASE_URL}/categories/{id}`
- **Method**: `GET`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/categories/1`
- **პასუხი**: `Category`

#### 3. **POST** `http://localhost:3000/api/categories`
- **აღწერა**: ახალი კატეგორიის დამატება
- **URL**: `${VITE_API_BASE_URL}/categories`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: 
  ```typescript
  {
    title: string;
    description: string;
  }
  ```
- **პასუხი**: `Category` (ახალი ID-ით)

#### 4. **PUT** `http://localhost:3000/api/categories/:id`
- **აღწერა**: კატეგორიის რედაქტირება
- **URL**: `${VITE_API_BASE_URL}/categories/{id}`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/categories/1`
- **Body**: `Partial<Category>`
- **პასუხი**: `Category` (განახლებული)

#### 5. **DELETE** `http://localhost:3000/api/categories/:id`
- **აღწერა**: კატეგორიის წაშლა
- **URL**: `${VITE_API_BASE_URL}/categories/{id}`
- **Method**: `DELETE`
- **პარამეტრები**: `id` (number)
- **მაგალითი**: `http://localhost:3000/api/categories/1`
- **პასუხი**: `null`

#### 6. **GET** `http://localhost:3000/api/categories/:id/animals`
- **აღწერა**: კატეგორიის მიხედვით ცხოველების მიღება
- **URL**: `${VITE_API_BASE_URL}/categories/{id}/animals`
- **Method**: `GET`
- **პარამეტრები**: `categoryId` (number)
- **მაგალითი**: `http://localhost:3000/api/categories/1/animals`
- **პასუხი**: `Animal[]`

### Currency (ვალუტა) API

#### 1. **GET** `https://api.bog.ge/docs/en/:to/:from/1`
- **აღწერა**: ვალუტის კონვერტაცია (Bank of Georgia API)
- **URL**: `${VITE_CURRENCY_API_URL}/{to}/{from}/1`
- **Method**: `GET`
- **პარამეტრები**: `from`, `to` (USD, GEL)
- **მაგალითი USD → GEL**: `https://api.bog.ge/docs/en/GEL/USD/1`
- **მაგალითი GEL → USD**: `https://api.bog.ge/docs/en/USD/GEL/1`
- **პასუხი**: 
  ```typescript
  {
    rate: number;
  }
  ```
- **Fallback**: 
  - თუ API არ მუშაობს, იყენებს `VITE_DEFAULT_CURRENCY_RATE_USD_TO_GEL=2.7`
  - ან `VITE_DEFAULT_CURRENCY_RATE_GEL_TO_USD=0.37`

## 🔐 Middlewares და ფუნქციონალები

### 1. **LocalStorage Persistence Middleware**
- **ფაილი**: `src/api/apiService.ts`
- **დანიშნულება**: Mock Data-ს პერსისტენსი LocalStorage-ში
- **ფუნქციები**:
  - `loadFromStorage()` - მონაცემების ჩატვირთვა
  - `saveToStorage()` - მონაცემების შენახვა
  - `resetMockData()` - რესეტი საწყის მდგომარეობაზე

```typescript
const STORAGE_KEYS = {
  ANIMALS: 'petshop_mock_animals',
  CATEGORIES: 'petshop_mock_categories',
  RELATIONS: 'petshop_mock_relations',
};
```

### 2. **Redux Cart Middleware**
- **ფაილი**: `src/store/cartSlice.ts`
- **ფუნქციები**:
  - `addToCart` - პროდუქტის დამატება კალათში
  - `removeFromCart` - პროდუქტის ამოღება
  - `updateQuantity` - რაოდენობის განახლება
  - `clearCart` - კალათის გასუფთავება
  - `toggleWishlist` - Wishlist-ში დამატება/ამოღება

### 3. **Mock Delay Middleware**
- **დანიშნულება**: რეალური API-ის იმიტაცია დაყოვნებით
- **დრო**: 300ms
```typescript
const mockDelay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));
```

### 4. **Axios Interceptors** (მზადაა Backend-ისთვის)
- **Base URL**: `http://localhost:3000/api`
- **Headers**: `Content-Type: application/json`
```typescript
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## ✨ ძირითადი ფუნქციონალები

### მომხმარებლის მხარე
1. **ცხოველების კატალოგი** - 4 ბარათი თითო მწკრივში (responsive)
2. **Hero Carousel** - ავტომატური სლაიდერი featured პროდუქტებით
3. **ფილტრაცია და სორტირება** - კატეგორიის, ფასის, პოპულარობის მიხედვით
4. **ვალუტის გადართვა** - USD ⇄ GEL (რეალურ დროში კონვერტაცია)
5. **კალათა (Cart)** - Redux-ით მართული
6. **Wishlist** - ფავორიტები
7. **დეტალური გვერდი** - სრული ინფორმაცია, სურათები, სპეციფიკაციები
8. **Checkout** - შეკვეთის გაფორმება

### ადმინისტრაციული პანელი
1. **ცხოველების მართვა**:
   - სია 3 ბარათით თითო მწკრივში
   - დამატება (სრული გვერდი ფორმით)
   - რედაქტირება (Modal)
   - წაშლა
   - რეალური სურათების გამოყენება

2. **კატეგორიების მართვა**:
   - სია 3 ბარათით თითო მწკრივში
   - დამატება/რედაქტირება/წაშლა
   
3. **Tab Navigation** - Pets/Categories
4. **Toast შეტყობინებები** - წარმატებული/შეცდომის შეტყობინებები

## 🎨 დიზაინის თემა

### ფერთა პალიტრა
- **Primary Green**: `#4a5f4a` (Dark Green)
- **Primary Orange**: `#ff6f00` (Vibrant Orange)
- **Secondary Blue**: `#5b7a9d` (Admin Panel)
- **Success Green**: `#4caf50`
- **Error Red**: `#e57373`
- **Background**: `#f5f5f5`

### Responsive Breakpoints
- **Desktop**: > 1024px (4 columns)
- **Tablet**: 768px - 1024px (3 columns)
- **Mobile**: < 768px (1-2 columns)

## 📦 TypeScript ინტერფეისები

### Animal
```typescript
interface Animal {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl?: string;
  isPopular: boolean;
  isStock: boolean;
  weight?: string;
  height?: string;
  color?: string;
  gender?: string;
  vaccinated?: string;
  microchipped?: string;
  age?: string;
}
```

### Category
```typescript
interface Category {
  id: number;
  title: string;
  description: string;
}
```

### CartItem
```typescript
interface CartItem {
  animal: Animal;
  quantity: number;
}
```

## 🚀 როგორ გავუშვათ პროექტი

### 1. დამოკიდებულებების დაყენება
```bash
npm install
```

### 2. Development სერვერის გაშვება
```bash
npm run dev
```
პროექტი ხელმისაწვდომი იქნება: `http://localhost:5173`

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production
```bash
npm run preview
```

## 🔄 Backend ინტეგრაციის ინსტრუქცია

1. **API URL-ის შეცვლა** (`src/api/apiService.ts`):
```typescript
const API_BASE_URL = 'http://your-backend-url/api';
const USE_MOCK_DATA = false; // ამის false-ზე გადართვა
```

2. **Swagger/OpenAPI დოკუმენტაციასთან შესაბამისობა**:
   - ყველა endpoint უკვე მზადაა
   - Request/Response ტიპები განსაზღვრულია
   - Error handling დამატებულია

3. **Authentication** (საჭიროების შემთხვევაში):
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📊 მონაცემთა ნაკადი (Data Flow)

```
Component → API Service → Mock/Real Backend
                ↓
         Redux Store (Cart/Wishlist)
                ↓
         LocalStorage Persistence
                ↓
         Component Re-render
```

## 🔐 Environment Variables (გარემოს ცვლადები)

### კონფიგურაცია

პროექტი იყენებს `.env` ფაილს sensitive მონაცემებისა და კონფიგურაციის მართვისთვის.

#### ძირითადი ცვლადები:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=true

# Currency API
VITE_CURRENCY_API_URL=https://api.bog.ge/docs/en
VITE_DEFAULT_CURRENCY_RATE_USD_TO_GEL=2.7
VITE_DEFAULT_CURRENCY_RATE_GEL_TO_USD=0.37

# LocalStorage Keys
VITE_STORAGE_KEY_ANIMALS=petshop_mock_animals
VITE_STORAGE_KEY_CATEGORIES=petshop_mock_categories
VITE_STORAGE_KEY_RELATIONS=petshop_mock_relations
VITE_STORAGE_KEY_AUTH_TOKEN=petshop_auth_token

# App Config
VITE_APP_NAME=Pet Shop
VITE_MOCK_API_DELAY=300
```

### გამოყენება კოდში:

```typescript
import { env } from './config/env';

// API Base URL
const apiUrl = env.apiBaseUrl;

// Mock Data Toggle
if (env.useMockData) {
  // Use LocalStorage
}

// Currency Rates
const rate = env.defaultCurrencyRates.usdToGel;
```

### უსაფრთხოება:

- ✅ `.env` დამატებულია `.gitignore`-ში
- ✅ `.env.example` არის template სხვა დეველოპერებისთვის
- ✅ ყველა sensitive data გარემოს ცვლადებშია
- ✅ TypeScript type safety
- ✅ Validation on app start

დეტალური ინფორმაცია: `ENV_SETUP.md`

## 🎯 მომავალი გაუმჯობესებები

1. ✅ User Authentication
2. ✅ Payment Gateway Integration
3. ✅ Order History
4. ✅ Image Upload (Cloudinary/AWS S3)
5. ✅ Search Functionality
6. ✅ Reviews and Ratings
7. ✅ Email Notifications
8. ✅ Multi-language Support

## 📝 შენიშვნები

- **Mock Data**: ამჟამად იყენებს LocalStorage-ს. ყველა ცვლილება პერსისტენტურია page reload-ის შემდეგაც.
- **Currency API**: იყენებს Bank of Georgia-ს API-ს რეალურ დროში კონვერტაციისთვის.
- **Responsive**: სრულად ადაპტირებული ყველა მოწყობილობისთვის.
- **TypeScript**: სრული ტიპ-უსაფრთხოება კოდბაზაში.

---

**შეკითხვებისთვის ან დახმარებისთვის**: 
- API დოკუმენტაცია: `API_SETUP_GUIDE.md`
- Environment Setup: `ENV_SETUP.md`
- პროექტის რეპოზიტორია: Git repository

**ავტორი**: Software Engineering Project  
**თარიღი**: December 2025  
**ვერსია**: 1.0.0


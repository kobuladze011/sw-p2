# Pet Shop Application

A full-featured pet shop application with an admin panel and frontend built with React, TypeScript, Redux, and styled-components.

## Features

### Admin Panel (styled-components)
- **Animals Management**: Create, read, update, and delete animals
- **Categories Management**: Create, read, update, and delete categories
- **Animals with Categories**: Link animals to categories
- Full CRUD operations with toast notifications

### Frontend Application (Module CSS)
- **Home Page**: Browse categories and navigate to category-specific animals
- **Animals Page**: View all animals with filtering and sorting
- **Categories Page**: View all categories
- **Animal Detail Page**: View detailed information about each animal
- **Wishlist**: Add/remove animals to/from wishlist (persisted in localStorage)
- **Shopping Cart**: Add animals to cart, adjust quantities, and complete purchases
- **Currency Conversion**: Toggle between USD ($) and GEL (₾)
- **Toast Notifications**: Success/error messages for all actions
- **Persistent Data**: Cart and wishlist data persists across page refreshes

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: 
  - Admin Panel: styled-components
  - Frontend: CSS Modules
- **Notifications**: react-toastify
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Code Formatting**: Prettier

## Data Models

### Animal
```typescript
{
  id: number;
  name: string;
  price: number;
  description: string;
  isPopular: boolean;
  isStock: boolean;
}
```

### Category
```typescript
{
  id: number;
  title: string;
  description: string;
}
```

### AnimalWithCategory
```typescript
{
  id: number;
  animal_id: number;
  category_id: number;
}
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sw-p2
```

2. Install dependencies
```bash
npm install
```

3. Configure API endpoint
Edit `src/api/apiService.ts` and update the `API_BASE_URL` to point to your backend:
```typescript
const API_BASE_URL = 'http://localhost:3000/api'; // Update this
```

4. Run the development server
```bash
npm run dev
```

## Backend API Requirements

The application expects the following API endpoints:

### Animals
- `GET /api/animals` - Get all animals
- `GET /api/animals/:id` - Get animal by ID
- `POST /api/animals` - Create new animal
- `PUT /api/animals/:id` - Update animal
- `DELETE /api/animals/:id` - Delete animal
- `PATCH /api/animals/:id/stock` - Decrease stock (for purchases)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Animals with Categories
- `GET /api/animals-with-categories` - Get all relations
- `GET /api/animals-with-categories/:id` - Get relation by ID
- `POST /api/animals-with-categories` - Create new relation
- `DELETE /api/animals-with-categories/:id` - Delete relation
- `GET /api/categories/:id/animals` - Get all animals in a category

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── admin/                    # Admin panel (styled-components)
│   ├── components/
│   │   ├── AnimalForm.tsx
│   │   ├── AnimalsList.tsx
│   │   ├── CategoryForm.tsx
│   │   ├── CategoriesList.tsx
│   │   └── AnimalsWithCategoriesList.tsx
│   ├── styles/
│   │   └── AdminStyles.ts
│   └── AdminPanel.tsx
├── api/
│   └── apiService.ts         # API service layer
├── components/               # Shared components
│   ├── Navbar.tsx
│   ├── Navbar.module.css
│   ├── CurrencyToggle.tsx
│   └── CurrencyToggle.module.css
├── pages/                    # Frontend pages (Module CSS)
│   ├── Home.tsx
│   ├── Home.module.css
│   ├── Animals.tsx
│   ├── Animals.module.css
│   ├── AnimalDetail.tsx
│   ├── AnimalDetail.module.css
│   ├── Categories.tsx
│   ├── Categories.module.css
│   ├── CategoryAnimals.tsx
│   ├── Wishlist.tsx
│   ├── Wishlist.module.css
│   ├── Cart.tsx
│   └── Cart.module.css
├── store/                    # Redux store
│   ├── index.ts
│   ├── hooks.ts
│   ├── cartSlice.ts
│   └── wishlistSlice.ts
├── types/
│   └── index.ts             # TypeScript type definitions
├── App.tsx
├── App.css
├── main.tsx
└── index.css
```

## Key Features Implementation

### 1. Currency Conversion
Uses Bank of Georgia API for real-time USD to GEL conversion. Fallback to hardcoded rates if API is unavailable.

### 2. Shopping Cart
- Add in-stock animals to cart
- Adjust quantities
- Persist cart in localStorage
- Calculate totals in selected currency
- Purchase simulation (decreases stock on backend)

### 3. Wishlist
- Toggle animals in/out of wishlist
- Persist wishlist in localStorage
- Quick add to cart from wishlist

### 4. Admin Panel
- Complete CRUD for animals and categories
- Link/unlink animals to/from categories
- Real-time validation
- Toast notifications for all actions

### 5. Responsive Design
- Mobile-friendly layouts
- Adaptive grid systems
- Touch-optimized controls

## TypeScript Configuration

The project uses strict TypeScript settings:
- `noImplicitAny: true`
- `strict: true`
- No `any` types allowed
- Full type safety across all components

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run format` to format code
4. Commit with descriptive messages
5. Push to `main` when ready

## License

Private project for educational purposes.

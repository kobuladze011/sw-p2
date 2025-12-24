# Backend API Setup Guide

This guide explains how to set up your backend API to work with the Pet Shop application.

## Base Configuration

Update the API base URL in `src/api/apiService.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000/api'; // Change to your backend URL
```

## Required Endpoints

### 1. Animals API

#### GET /api/animals
Returns all animals.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Golden Retriever",
    "price": 500,
    "description": "Friendly and loyal dog",
    "isPopular": true,
    "isStock": true
  }
]
```

#### GET /api/animals/:id
Returns a single animal by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Golden Retriever",
  "price": 500,
  "description": "Friendly and loyal dog",
  "isPopular": true,
  "isStock": true
}
```

#### POST /api/animals
Creates a new animal.

**Request Body:**
```json
{
  "name": "Golden Retriever",
  "price": 500,
  "description": "Friendly and loyal dog",
  "isPopular": true,
  "isStock": true
}
```

**Response:** Same as GET single animal

#### PUT /api/animals/:id
Updates an existing animal.

**Request Body:** Same as POST

**Response:** Updated animal object

#### DELETE /api/animals/:id
Deletes an animal.

**Response:** 204 No Content or success message

#### PATCH /api/animals/:id/stock
Decreases stock when animals are purchased.

**Request Body:**
```json
{
  "quantity": 1
}
```

**Response:** Updated animal object

---

### 2. Categories API

#### GET /api/categories
Returns all categories.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Dogs",
    "description": "All types of dogs"
  }
]
```

#### GET /api/categories/:id
Returns a single category by ID.

**Response:**
```json
{
  "id": 1,
  "title": "Dogs",
  "description": "All types of dogs"
}
```

#### POST /api/categories
Creates a new category.

**Request Body:**
```json
{
  "title": "Dogs",
  "description": "All types of dogs"
}
```

**Response:** Created category object

#### PUT /api/categories/:id
Updates an existing category.

**Request Body:** Same as POST

**Response:** Updated category object

#### DELETE /api/categories/:id
Deletes a category.

**Response:** 204 No Content or success message

---

### 3. Animals with Categories API

#### GET /api/animals-with-categories
Returns all animal-category relations.

**Response:**
```json
[
  {
    "id": 1,
    "animal_id": 1,
    "category_id": 1
  }
]
```

#### GET /api/animals-with-categories/:id
Returns a single relation by ID.

**Response:**
```json
{
  "id": 1,
  "animal_id": 1,
  "category_id": 1
}
```

#### POST /api/animals-with-categories
Creates a new animal-category relation.

**Request Body:**
```json
{
  "animal_id": 1,
  "category_id": 1
}
```

**Response:** Created relation object

#### DELETE /api/animals-with-categories/:id
Deletes an animal-category relation.

**Response:** 204 No Content or success message

#### GET /api/categories/:id/animals
Returns all animals in a specific category.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Golden Retriever",
    "price": 500,
    "description": "Friendly and loyal dog",
    "isPopular": true,
    "isStock": true
  }
]
```

---

## Database Schema

### animals table
```sql
CREATE TABLE animals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  isPopular BOOLEAN DEFAULT FALSE,
  isStock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### categories table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### animals_with_categories table
```sql
CREATE TABLE animals_with_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY unique_animal_category (animal_id, category_id)
);
```

---

## CORS Configuration

Make sure your backend allows requests from your frontend origin. Example for Express.js:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server default port
  credentials: true
}));
```

---

## Testing with Swagger

If you're using Swagger:

1. Import the API definitions
2. Test each endpoint
3. Create sample data:
   - At least 5-10 animals
   - At least 3-5 categories
   - Link animals to categories using animals_with_categories

### Sample Test Data

**Animals:**
- Golden Retriever - Dogs - $500
- Persian Cat - Cats - $300
- Parrot - Birds - $150
- Hamster - Small Pets - $20
- Goldfish - Fish - $5

**Categories:**
- Dogs
- Cats
- Birds
- Small Pets
- Fish

---

## Error Handling

The frontend expects standard HTTP status codes:

- **200-299**: Success
- **400-499**: Client errors (validation, not found, etc.)
- **500-599**: Server errors

Error response format:
```json
{
  "error": "Error message here"
}
```

---

## Testing the Integration

1. Start your backend server
2. Update `API_BASE_URL` in the frontend
3. Run `npm run dev`
4. Test the following flow:
   - Create categories in admin panel
   - Create animals in admin panel
   - Link animals to categories
   - View animals on frontend
   - Add to wishlist/cart
   - Complete a purchase

---

## Troubleshooting

### CORS Errors
- Enable CORS in your backend
- Check that the origin matches your frontend URL

### 404 Errors
- Verify API endpoints match the documentation
- Check that base URL is correct

### Data Not Showing
- Check browser console for errors
- Verify backend is returning correct data format
- Use browser DevTools Network tab to inspect requests/responses


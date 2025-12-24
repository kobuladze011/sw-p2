import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal } from '../types';

interface WishlistState {
  items: Animal[];
}

const loadWishlistFromLocalStorage = (): Animal[] => {
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistToLocalStorage = (items: Animal[]) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Animal>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToLocalStorage(state.items);
    },
    toggleWishlist: (state, action: PayloadAction<Animal>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToLocalStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

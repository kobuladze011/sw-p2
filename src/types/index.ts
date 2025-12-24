export interface Animal {
  id: number;
  name: string;
  price: number;
  description: string;
  isPopular: boolean;
  isStock: boolean;
  imageUrl?: string;
  category?: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
}

export interface AnimalWithCategory {
  id: number;
  animal_id: number;
  category_id: number;
}

export interface CartItem extends Animal {
  quantity: number;
}

export interface CurrencyRate {
  rate: number;
  currency: string;
}

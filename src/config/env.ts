/**
 * Environment Configuration
 * 
 * This file centralizes all environment variables for easy access
 * and type safety throughout the application.
 */

export const env = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',  // Default true (როგორც ადრე იყო)
  
  // Currency API
  currencyApiUrl: import.meta.env.VITE_CURRENCY_API_URL || 'https://api.bog.ge/docs/en',
  defaultCurrencyRates: {
    usdToGel: parseFloat(import.meta.env.VITE_DEFAULT_CURRENCY_RATE_USD_TO_GEL) || 2.7,
    gelToUsd: parseFloat(import.meta.env.VITE_DEFAULT_CURRENCY_RATE_GEL_TO_USD) || 0.37,
  },
  
  // LocalStorage Keys
  storageKeys: {
    animals: import.meta.env.VITE_STORAGE_KEY_ANIMALS || 'petshop_mock_animals',
    categories: import.meta.env.VITE_STORAGE_KEY_CATEGORIES || 'petshop_mock_categories',
    relations: import.meta.env.VITE_STORAGE_KEY_RELATIONS || 'petshop_mock_relations',
    authToken: import.meta.env.VITE_STORAGE_KEY_AUTH_TOKEN || 'petshop_auth_token',
  },
  
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Pet Shop',
  mockApiDelay: parseInt(import.meta.env.VITE_MOCK_API_DELAY) || 300,
} as const;

// Type-safe environment variable access
export type Env = typeof env;

// Validation: Check if required environment variables are present
export const validateEnv = (): void => {
  const requiredVars = [
    'VITE_API_BASE_URL',
    'VITE_USE_MOCK_DATA',
  ];

  const missing = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(', ')}\n` +
      'Using default values. Please check your .env file.'
    );
  }
};

// Log environment info in development
if (import.meta.env.DEV) {
  console.log('🔧 Environment Configuration:', {
    mode: import.meta.env.MODE,
    apiBaseUrl: env.apiBaseUrl,
    useMockData: env.useMockData,
  });
}


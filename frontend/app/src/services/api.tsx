import type { RecipeRequest, Recipe } from '../types';

const API_BASE_URL = "http://localhost:8000"

// use RecipeRequest type for input parameter
export const fetchRecipes = async (recipeRequest: RecipeRequest): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/api/openai/generate_text`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeRequest), // convert ingredients string list to string
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }

  // convert response to json
  const data: Recipe[] = await response.json();
  return data;
}

// favorites API functions
/**
 * Loads 
 */
export const fetchFavorites = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch favorites: ${response.statusText}`);
  }

  // convert response to json
  const data: Recipe[] = await response.json();
  return data
}

export const addFavorite = async (recipe: Recipe): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error(`Failed to add favorite: ${response.statusText}`);
  }

  return await response.json();
}

export const removeFavorite = async (recipeName: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites/${encodeURIComponent(recipeName)}`, {
    method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
    throw new Error(`Failed to remove favorite: ${response.statusText}`);
  }
}

export const clearFavorites = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
});

  if (!response.ok) {
    throw new Error(`Failed to clear favorites: ${response.statusText}`);
  }
}
import type { RecipeRequest, Recipe } from '../types';

const API_BASE_URL = "http://localhost:8000"

/**
 * service function for making api call to openai api
 * @param recipeRequest - RecipeRequest type, contains list of ingredient strings
 * @return - returns list of Recipe types from llm response
 */
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
 * service function to get list of recipes from favorites database
 * @return - list of Recipe types contained within the favorites database
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

/**
 * adds user selected recipe to the favorites database
 */
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

/**
 * removes user selected recipe from favorites database
 */
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

/**
 * clears all recipes found within favorites database
 */
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
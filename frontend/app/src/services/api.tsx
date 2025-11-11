import type { RecipeRequest } from '../types';

const API_BASE_URL = "http://localhost:8000"

// Use RecipeRequest type for input parameter
export const fetchRecipes = async (recipeRequest: RecipeRequest): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/openai/generate_text`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeRequest),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
}
export interface Ingredient {
    id: string;
    name: string;
}
  
export interface Recipe {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

export interface RecipeRequest {
    ingredients: string[]
}
export interface Ingredient {
    id: string;
    name: string;
}
  
export interface Recipe {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[]; // might need to change to just a string
}

export interface RecipeRequest {
    ingredients: string[]
}
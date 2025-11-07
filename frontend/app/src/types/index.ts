export interface Ingredient {
    id: string;
    name: string;
    category: 'protein' | 'vegetable' | 'spice' | 'sauce';
}
  
export interface Recipe {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[]; // go back and change instructions to just a string
}
  
export type CategoryType = 'protein' | 'vegetable' | 'spice' | 'sauce';
  
export interface InputsState {
    protein: string;
    vegetable: string;
    spice: string;
    sauce: string;
}
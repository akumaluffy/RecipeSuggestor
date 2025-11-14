from fastapi import APIRouter, HTTPException
from app.services.favorites_database import (get_all_favorites, add_favorite, remove_favorite, clear_all_favorites)
from app.models import RecipeResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List(RecipeResponse))
async def get_favorites():
    try:
        favorites = get_all_favorites()
        return [RecipeResponse(**fav) for fav in favorites]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch favorites: {str(e)}")

@router.post("/", response_model=RecipeResponse)
async def add_favorite_recipe(recipe: RecipeResponse): 
    try:
        recipe_dict = recipe.dict()
        success = add_favorite(recipe_dict)
        if not success:
            raise HTTPException(status_code=400, details="Recipe already in favorites")
        return recipe
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add favorite: {str(e)}")

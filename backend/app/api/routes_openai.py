from fastapi import APIRouter, HTTPException
from app.services.openai_service import get_openai_response
from pydantic import BaseModel
from typing import List
import json

# structure of each request object, ensures request includes list of ingredients
class RecipeRequest(BaseModel):
    ingredients: List[str]

# structure of each recipe object returned by endpoint
class RecipeResponse(BaseModel):
    name: str
    description: str
    ingredients: List[str]
    instructions: List[str]

router = APIRouter()

'''

'''
@router.post("/generate_text", response_model=List[RecipeResponse])
async def generate_text(request: RecipeRequest):
    prompt = f"""I need recipe ideas using the ingredients that I currently have on hand. Could you give me 4 recipe suggestions using the following ingredients: {', '.join(request.ingredients)}? If any ingredients given in the list are not food items or cooking ingredients, make sure to exclude them when searching for recipes.
    
    Format the response as a JSON array of recipes, where each recipe has:
    - name: string
    - description: string
    - ingredients: array of strings
    - instructions: array of strings

    Return only valid JSON, no other text, and do not wrap the JSON response in markdown code blocks."""

    try:
        response = await get_openai_response(prompt)
        response = response.strip()

        recipes_data = json.loads(response)
        recipes = [RecipeResponse(**recipe) for recipe in recipes_data]
        return recipes
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse recipe response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
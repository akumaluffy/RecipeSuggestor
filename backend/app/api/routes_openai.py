from fastapi import APIRouter, HTTPException
from app.services.openai_service import get_openai_response
from pydantic import BaseModel
import json

class RecipeRequest(BaseModel):
    ingredients: list[str]

class RecipeResponse(BaseModel):
    name: str
    description: str
    ingredients: list[str]
    instructions: list[str]

router = APIRouter()

@router.post("/generate_text")
async def generate_text(request: RecipeRequest):
    prompt = f"""I need recipe ideas using the ingredients that I currently have on hand. Could you give me 4 recipe suggestions using the following ingredients: {', '.join(request.ingredients)}?
    
    Format the response as a JSON array of recipes, where each recipe has:
    - name: string
    - description: string
    - ingredients: array of strings
    - instructions: array of strings
    
    Return only valid JSON, no other text, and do not wrap the JSON response in markdown code blocks"""

    try:
        response = get_openai_response(prompt)
        response = response.strip()

        recipes = json.loads(response)
        return recipes
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse recipe response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
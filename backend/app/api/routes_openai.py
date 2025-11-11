from fastapi import APIRouter, HTTPException
from app.services.openai_service import get_openai_response
from pydantic import BaseModel

class RecipeRequest(BaseModel):
    ingredients: list[str]

router = APIRouter()

@router.post("/generate_text")
async def generate_text(request: RecipeRequest):
    prompt = f"I need recipe ideas using the ingredients that I currently have on hand. Could you give me 4 recipe suggestions using the following ingredients: {', '.join(request.ingredients)}?"

    try:
        response = await get_openai_response(prompt)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
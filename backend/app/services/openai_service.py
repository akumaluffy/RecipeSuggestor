from openai import AsyncOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

'''
Handles call to openai api
@param prompt - prompt to send to openai gpt-5-nano model
@returns string 
'''
async def get_openai_response(prompt: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-5-nano-2025-08-07",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    output_text = response.choices[0].message.content
    return output_text
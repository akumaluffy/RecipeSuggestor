from openai import AsyncOpenAI
import os, sys
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def get_openai_response(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-5-nano-2025-08-07",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    # The response content is in response.choices[0].message.content
    output_text = response.choices[0].message.content
    return output_text
import sqlite3
import json
import os
from typing import List, Optional, Dict, Any

# Database file path - adjust based on where the script is run from
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "app", "database.db")

async def init_database():
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS favorites (
            name TEXT UNIQUE NOT NULL,
            description TEXT NOT NULL,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL
        )
    """)

    con.commit()
    con.close()

async def get_all_favorites() -> List[Dict[str, Any]]:
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    cur.execute("SELECT name, description, ingredients, instructions FROM favorites")
    rows = cur.fetchall()

    favorites = []
    for row in rows:
        favorites.append({
            "name": row[0],
            "description": row[1],
            "ingredients": json.loads(row[2]),  # Parse JSON string back to list
            "instructions": json.loads(row[3])   # Parse JSON string back to list
        })
    
    con.close()
    return favorites

async def add_favorite(recipe_data: Dict[str, Any]) -> bool:
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    try:
        ingredients_json = json.dumps(recipe_data["ingredients"])
        instructions_json = json.dumps(recipe_data["instructions"])

        cur.execute("""
            INSERT INTO favorites (name, description, ingredients, instructions)
            VALUES (?, ?, ?, ?)
        """, (
            recipe_data["name"],
            recipe_data["description"],
            ingredients_json,
            instructions_json
        ))
        
        con.commit()
        con.close()
        return True
    
    except sqlite3.IntegrityError:
        # Recipe already exists based on name of recipe
        con.close()
        return False
    except Exception as e:
        con.close()
        raise e

async def remove_favorites(recipe_name: str) -> bool:
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    cur.execute("DELETE FROM favorites WHERE name = ?", (recipe_name,))
    deleted = cur.rowcount > 0 # cur.rowcount returns number of rows deleted by last execute call, > 0 confirms successful deletion
    con.commit()
    con.close()
    return deleted

async def clear_all_favorites() -> int:
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()

    cur.execute("DELETE FROM favorites")
    count = cur.rowcount
    con.commit()
    con.close()
    return count

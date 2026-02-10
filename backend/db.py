import json
import os
from typing import Dict

DB_FILE = "users.json"

def load_db() -> Dict[str, dict]:
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_db(data: Dict[str, dict]):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

# Load existing data on startup
users_db: Dict[str, dict] = load_db()

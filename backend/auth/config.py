import os

SECRET_KEY = os.getenv("SECRET_KEY", "hackathon_secret_key_12345")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

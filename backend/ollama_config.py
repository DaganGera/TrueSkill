import os

# Model Configuration
# You can change this to "llama3", "llama3:70b", "mistral", or custom models like "oss-20b"
# make sure to run `ollama pull <model_name>` in your terminal first.
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:latest") 

# Generation Parameters
TEMPERATURE = 0.7
MAX_TOKENS = 1000

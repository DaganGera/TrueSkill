import ollama
from typing import Optional
from backend.ollama_config import OLLAMA_MODEL

def query_ollama(prompt: str, model: str = OLLAMA_MODEL, format: str = None) -> Optional[str]:
    """
    Sends a prompt to the local Ollama instance and returns the response.

    Args:
        prompt (str): The input text prompt to send to the model from the user.
        model (str): The name of the model to use (default: configured OLLAMA_MODEL).
        format (str): The format of the response (e.g., "json").

    Returns:
        Optional[str]: The generated response text, or None if an error occurs.
    """
    if not prompt:
        return None

    try:
        # strict=True ensures that we get a direct response without streaming.
        # This is more "production-safe" for simple sequential calls where complete output is needed.
        response = ollama.chat(model=model, format=format, messages=[
            {
                'role': 'user',
                'content': prompt,
            },
        ])
        
        # Access the message content safely
        if 'message' in response and 'content' in response['message']:
            return response['message']['content']
        
        print(f"Error: Unexpected response format from Ollama: {response}")
        return None

    except ollama.ResponseError as e:
        print(f"Ollama Response Error: {e.error}")
        return None
    except ConnectionError:
        print("Error: Could not connect to Ollama. Is the server running?")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

if __name__ == "__main__":
    # Simple test to verify it works
    print("Testing connection to Ollama...")
    result = query_ollama("Hello, are you working?")
    if result:
        print(f"Response: {result}")
    else:
        print("Failed to get response.")

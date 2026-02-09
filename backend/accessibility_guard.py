from typing import Dict, Any
import json

def get_accessibility_rules(user_mode: str) -> Dict[str, Any]:
    """
    Returns accessibility accommodations and evaluation rules based on user mode.
    
    Args:
        user_mode (str): One of "general", "deaf", "mute", "neurodivergent".
        
    Returns:
        Dict[str, Any]: Configuration for evaluation rules and question styles.
    """
    
    # Default rules (General)
    config = {
        "evaluation_rules": {
            "ignore_grammar": False,
            "ignore_speech_latency": False,
            "time_pressure": "normal"
        },
        "preferred_question_style": "text"
    }

    if user_mode == "deaf":
        config["evaluation_rules"]["ignore_grammar"] = True # Sign language structure is different
        config["evaluation_rules"]["ignore_speech_latency"] = False # Not applicable as input is text/sign
        config["preferred_question_style"] = "visual" # Visual cues are better
        
    elif user_mode == "mute":
        config["evaluation_rules"]["ignore_speech_latency"] = False
        config["preferred_question_style"] = "text" # Text-based interaction
        
    elif user_mode == "neurodivergent":
        config["evaluation_rules"]["ignore_grammar"] = False
        config["evaluation_rules"]["time_pressure"] = "none" # Remove anxiety-inducing timers
        config["preferred_question_style"] = "scenario" # Concrete scenarios are often clearer than abstract questions
        
    elif user_mode != "general":
        # Fallback for unknown modes, defaulting to general with a warning (internally handled)
        pass

    return config

if __name__ == "__main__":
    modes_to_test = ["general", "deaf", "neurodivergent"]
    
    for mode in modes_to_test:
        print(f"\n--- User Mode: {mode} ---")
        rules = get_accessibility_rules(mode)
        print(json.dumps(rules, indent=2))
        
    print("\n--- Bias Reduction Explanation ---")
    print("1. Fairness over Equality: We adjust NOT the score, but the *conditions* to allow demonstration of skill.")
    print("2. Accommodations: Removing barriers (e.g., time pressure for neurodivergent users) ensures we measure ability, not anxiety.")
    print("3. No Labels: We store the 'configuration', not the medical diagnosis.")

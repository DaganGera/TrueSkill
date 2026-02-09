import hashlib
import json

def anonymize_candidate(real_identifier: str) -> str:
    """
    Anonymizes a candidate identifier using SHA-256 hashing.
    
    Args:
        real_identifier (str): The candidate's real identifier (e.g., email, ID).
        
    Returns:
        str: The SHA-256 hash of the identifier.
    """
    if not real_identifier:
        raise ValueError("Identifier cannot be empty.")
        
    # SHA-256 hashing
    return hashlib.sha256(real_identifier.encode('utf-8')).hexdigest()

if __name__ == "__main__":
    # Test cases
    test_id = "candidate@example.com"
    hashed_id = anonymize_candidate(test_id)
    
    print(f"Original: {test_id}")
    print(f"Hashed:   {hashed_id}")
    
    # Verification: Same input -> Same hash
    assert anonymize_candidate(test_id) == hashed_id
    print("Verification passed: Deterministic hashing confirmed.")

    # Example HR-facing JSON response
    hr_response = {
        "candidate_id": hashed_id,
        "assessment_score": 85,
        "status": "Shortlisted"
    }
    
    print("\n--- Example HR-Facing JSON Response ---")
    print(json.dumps(hr_response, indent=2))
    
    print("\n--- Privacy Explanation ---")
    print("1. One-way hashing (SHA-256) makes it computationally infeasible to reverse-engineer the original email.")
    print("2. Deterministic hashing ensures the same candidate always gets the same ID for tracking across assessments.")
    print("3. HR sees only the hash, preventing bias based on email names or other PII.")

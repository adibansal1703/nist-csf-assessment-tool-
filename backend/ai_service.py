import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

async def assess_evidence(subcategory_text: str, evidence_notes: str):
    if not GEMINI_API_KEY:
        return {"error": "Gemini API key not configured"}

    generation_config = {
        "temperature": 0.2,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        generation_config=generation_config,
    )

    prompt = f"""
    You are a cybersecurity auditor specializing in NIST CSF 2.0.

    NIST Subcategory Outcome: "{subcategory_text}"
    Organization Evidence Provided: "{evidence_notes}"

    Based on the evidence, suggest a maturity tier score (0, 25, 50, 75, or 100) where:
    0: Not Started
    25: Initial
    50: Partially Implemented
    75: Largely Implemented
    100: Fully Implemented / Optimized

    Also provide a brief justification and a specific recommendation to reach the next tier.

    Return the response in JSON format with exactly these keys: 'suggested_score', 'justification', 'recommendation'.
    'suggested_score' must be a string: "0", "25", "50", "75", or "100".
    """

    try:
        response = await model.generate_content_async(prompt)
        # Parse the JSON response
        result = json.loads(response.text)
        return result
    except Exception as e:
        return {"error": str(e)}

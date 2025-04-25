import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask import jsonify

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def extract_questions_from_text(text):
    try:
        model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

        prompt = f"""Extract all possible academic questions from the following content.

Format them as a plain list like:
- What is XYZ?
- How does ABC work?

Content:
{text[:15000]}
"""

        response = model.generate_content(prompt)
        print("Gemini response:\n", response.text)

        # Clean and parse
        raw_lines = response.text.strip().split('\n')
        questions = [q.strip("-•* ").strip() for q in raw_lines if q.strip()]

        # Convert to frontend-friendly format
        wrapped = [
            {
                "question": q,
                "frequency": 1,
                "sources": ["Uploaded Document"]
            } for q in questions
        ]

        return jsonify({"questions": wrapped})

    except Exception as e:
        print("Error in extract_questions_from_text:", str(e))
        return jsonify({"error": str(e), "questions": []}), 500

import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask import jsonify

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_summary(text):
    try:
        model = genai.GenerativeModel(model_name="models/gemini-1.5-pro")

        prompt = f"""Summarize the following academic content in a clear and concise way:\n\n{text[:15000]}"""

        response = model.generate_content(prompt)

        return jsonify({"summary": response.text.strip()})

    except Exception as e:
        print("Error in generate_summary:", str(e))
        return jsonify({"error": str(e)}), 500

import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

def summarize_text(text: str) -> str:
    prompt = f"Summarize the following:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text

def extract_keywords(text: str) -> list:
    prompt = f"From this content, give 3-5 educational keywords:\n\n{text}"
    response = model.generate_content(prompt)
    lines = response.text.splitlines()
    return [line.strip("-• ") for line in lines if line.strip()]

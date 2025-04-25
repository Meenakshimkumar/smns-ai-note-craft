from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from utils.utils import summarize_text, extract_keywords
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/voice/upload")
async def upload_audio(audio: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, audio.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(audio.file, f)

    # Simulate transcription
    transcript = "Today we will discuss cell biology... mitochondria generates ATP..."

    # Use Gemini to summarize & extract keywords
    summary = summarize_text(transcript)
    keywords = extract_keywords(transcript)

    # Generate image placeholders
    images = [{"alt": k, "url": f"https://via.placeholder.com/150?text={k.replace(' ', '+')}"} for k in keywords]

    return {
        "transcript": transcript,
        "summary": summary,
        "images": images,
    }

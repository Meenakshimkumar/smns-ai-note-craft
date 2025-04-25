from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os, base64, io
from PIL import Image
import google.generativeai as genai

# Load .env file
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or use ["http://localhost:3000"] for tighter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input model
class ImageData(BaseModel):
    image_base64: str

# Route to convert handwriting to text using Gemini Vision
@app.post("/convert-handwriting")
def convert_handwriting(data: ImageData):
    try:
        # Decode image from base64
        image_data = base64.b64decode(data.image_base64.split(",")[1])
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Convert image to JPEG bytes
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format="JPEG")
        img_bytes = img_byte_arr.getvalue()

        # Send to Gemini
        response = model.generate_content([
            "Extract the handwritten text from this image. Output only the exact text you see.",
            {
                "mime_type": "image/jpeg",
                "data": img_bytes
            }
        ])

        return { "text": response.text.strip() }

    except Exception as e:
        print("🔥 ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

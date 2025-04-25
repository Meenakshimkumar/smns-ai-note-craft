from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.pdf_processor import extract_text_from_pdf
from utils.summarizer import generate_summary
from utils.question_extractor import extract_questions_from_text

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "SMNS AI Note Craft Backend is running."

@app.route("/upload", methods=["POST"])
def upload_and_process():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename

    try:
        text = extract_text_from_pdf(file)

        if not text.strip():
            return jsonify({"error": "Failed to extract text from PDF"}), 500

        summary_result = generate_summary(text)
        summary = summary_result.json.get("summary", "")

        question_result = extract_questions_from_text(text)
        questions = question_result.json.get("questions", [])

        return jsonify({
            "filename": filename,
            "summary": summary,
            "questions": questions
        })

    except Exception as e:
        print("Upload processing error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

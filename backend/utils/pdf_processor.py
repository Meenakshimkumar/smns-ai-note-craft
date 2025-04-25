import fitz  # PyMuPDF

def extract_text_from_pdf(file_storage):
    try:
        # file_storage is the uploaded file from Flask (werkzeug FileStorage)
        file_bytes = file_storage.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")

        text = ""
        for page in doc:
            text += page.get_text()

        doc.close()
        return text

    except Exception as e:
        print("PDF processing error:", e)
        return ""

# 📚 SMNS - Smart Multi-Note System

**SMNS - Smart Multi-Note System** is an AI-powered note-taking tool that transforms content from PDFs, handwritten notes, and voice recordings into clean, structured digital notes. Designed for students, educators, and professionals, NoteCraft automates learning with features like summarization, flashcard generation, and Q\&A support.

---

## ✨ Features

* ✍️ **Handwriting to Typed Notes**
  Convert handwritten notes into clean, editable text.

* 📄 **PDF Processing**
  Upload PDFs to extract repeated questions, generate summaries, and more.

* 🎤 **Voice Note Processing**
  Record voice inputs to generate:

  * Transcripts
  * Topic descriptions
  * Relevant images

* 💡 **AI-Powered Tools**
  Generate summaries, mind maps, and Q\&A from notes using AI.

---

## 🛠️ Tech Stack

* 🖥️ [React](https://reactjs.org/) – Frontend library
* 💬 [TypeScript](https://www.typescriptlang.org/) – Strongly typed JavaScript
* ⚡ [Vite](https://vitejs.dev/) – Fast frontend bundler
* 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
* 🧩 [shadcn/ui](https://ui.shadcn.dev/) – UI components for React
* 🐍 [Python](https://www.python.org/) – Backend programming
* ⚙️ [FastAPI](https://fastapi.tiangolo.com/) – For handwriting and voice features
* 🌐 [Flask](https://flask.palletsprojects.com/) – For PDF processing
* 🔌 [Uvicorn](https://www.uvicorn.org/) – ASGI server for FastAPI
* 🤖 [Gemini API](https://deepmind.google/technologies/gemini/) – AI model integration

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Meenakshimkumar/smns-ai-note-craft.git
cd smns-ai-note-craft
```

---

### 2️⃣ Frontend Setup

```bash
npm install
npm run dev
```

* Frontend runs at: `http://localhost:3000`

---

### 3️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Then, run the appropriate command based on the feature:

| 🔧 Feature               | ▶️ Run Command               | Framework |
| ------------------------ | ---------------------------- | --------- |
| 📄 PDF Summarizer        | `python app.py`              | Flask     |
| ✍️ Handwriting Processor | `uvicorn main:app --reload`  | FastAPI   |
| 🎤 Voice Input Handler   | `uvicorn index:app --reload` | FastAPI   |

---

## 📁 Project Structure

```
smns-ai-note-craft/
├── backend/
│   ├── app.py        # PDF processing (Flask)
│   ├── main.py       # Handwriting recognition (FastAPI)
│   └── index.py      # Voice processing (FastAPI)
├── public/           # Static assets
├── src/              # React frontend
├── .env              # Environment variables
├── index.html        # Main entry HTML
├── package.json      # Frontend dependencies
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🧑‍💻 Team Members

* **Meenakshi M Kumar** – Frontend & AI Integration
* **Narthana Baby B S** – Handwriting-to-Text & Backend
* **Swsthik H Nair** – Voice Processing & Backend
* **Swarag V S** – PDF Summarization & UI Testing


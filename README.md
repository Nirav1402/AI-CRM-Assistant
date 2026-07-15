# 🩺 AI CRM Assistant for Pharmaceutical Field Representatives

An AI-powered Customer Relationship Management (CRM) application that enables pharmaceutical field representatives to log Healthcare Professional (HCP) interactions using natural language. The system extracts structured CRM data with AI and automatically populates an interaction form.

---

## 🚀 Features

- 🤖 AI-powered conversational CRM assistant
- 💬 Natural language interaction logging
- 🧠 Intelligent extraction of structured CRM data
- 📋 Automatic form filling
- ✏️ Edit existing interactions
- 📝 AI-generated interaction summaries
- 📅 Follow-up recommendations
- ✅ Interaction validation
- 💾 SQLite database for storing interactions
- ⚡ FastAPI backend
- 🎨 React + Material UI frontend
- 🔄 LangGraph workflow for AI orchestration

---

## 🛠️ Tech Stack

### Frontend
- React
- Redux Toolkit
- Material UI (MUI)
- Vite

### Backend
- FastAPI
- LangGraph
- LangChain
- SQLite
- Python

### AI
- Groq API (Llama/Gemma models)
- LangChain

---

## 📁 Project Structure

```
AI-CRM/
│
├── backend/
│   ├── app/
│   ├── main.py
│   ├── config.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-CRM.git
cd AI-CRM
```

---

### 2. Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory:

```env
GROQ_API_KEY=your_api_key
MODEL_NAME=llama-3.3-70b-versatile
```

Run the backend:

```bash
python -m uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## 📷 Application Workflow

1. User enters an HCP interaction in natural language.
2. AI detects the user's intent.
3. LangGraph routes the request.
4. AI extracts structured CRM information.
5. The interaction form is automatically populated.
6. AI generates a professional summary.
7. Data is stored in SQLite.

---

## Example

### User Input

```
I met Dr. Shah today and discussed Jardiance.
He showed interest and requested product samples.
```

### AI Output

- HCP Name
- Product Discussed
- Interaction Type
- Sentiment
- Summary
- Follow-up Recommendation

---

## Future Improvements

- Authentication
- User roles
- Dashboard analytics
- Voice-to-text interaction logging
- CRM reporting
- Multi-model AI support

---

## Author

**Nirav Acharya**

GitHub: https://github.com/Nirav1402

---

## License

This project is developed for learning and demonstration purposes.

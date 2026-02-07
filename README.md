# 📚 AI-Powered Library Services Chatbot (ScaleDown API Integrated)

## Overview
This project is an AI-powered library chatbot that automates catalog search, book holds, renewals, recommendations, event registration, research assistance, and fine reminders.  
It integrates with Library Management Systems (Koha/Sierra) and uses the **ScaleDown API** to efficiently compress and optimize large-scale book catalog data.

---

## Key Features
- Book search with compressed summaries
- Holds and renewals
- AI-based reading recommendations
- Mood-based recommendations (creative feature)
- Smart due-date reminders
- Library usage analytics
- Event registration

---

## ScaleDown API Integration

### Purpose
- Compress book summaries by ~80%
- Reduce response time
- Optimize storage and bandwidth
- Enable instant AI recommendations

### Implementation
- ScaleDown REST API is used for real-time summarization
- API calls are handled securely using environment variables

---

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: FastAPI (Python)
- Database: SQLite
- AI: ScaleDown API, NLP
- APIs: Koha LMS (REST), ScaleDown

---

## Project Structure
library-services-chatbot/
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── services/
│ │ └── scaledown_service.py
│ └── routes/
├── frontend/
├── ai_engine/
├── README.md

---

## How to Run
```bash
pip install fastapi uvicorn python-dotenv requests
cd backend
uvicorn main:app --reload

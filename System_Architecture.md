# System Architecture

## High-Level Architecture
The system follows a modular client-server architecture with AI integration.

User → Frontend (React)
→ Backend API (Node/Flask)
→ LMS (Koha/Sierra)
→ Database
→ ScaleDown API


## Components

### Frontend
- Chat interface
- Book search UI
- User dashboard
- Event registration and fine payment pages

### Backend
- Handles user requests
- Communicates with LMS APIs
- Manages authentication
- Stores transaction data

### ScaleDown API
- Compresses book summaries (80% size reduction)
- Enables fast recommendation generation
- Optimizes catalog data retrieval

### LMS Integration
- Fetches real-time book availability
- Manages holds and renewals
- Syncs patron records

## Data Flow
1. User sends query via chatbot
2. Backend processes request
3. Data fetched from LMS or database
4. ScaleDown API optimizes response
5. Result returned to user

## Security
- API key-based authentication
- HTTPS communication
- Role-based access control

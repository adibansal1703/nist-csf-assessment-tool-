# NIST CSF 2.0 Self-Assessment & Cybersecurity Profile Tool

A modern, full-stack enterprise web application for conducting, visualizing, and reporting cybersecurity self-assessments based on the **NIST Cybersecurity Framework (CSF) 2.0**.

![NIST CSF 2.0 Assessment Tool](https://img.shields.io/badge/Framework-NIST%20CSF%202.0-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript-61dafb.svg)
![Tailwind](https://img.shields.io/badge/UI-Tailwind%20CSS-38bdf8.svg)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python-009688.svg)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-8e44ad.svg)

---

## 🚀 Key Features

- **NIST CSF 2.0 Framework Guidance**: Evaluates cybersecurity maturity across all **6 Core Functions**:
  - `GOVERN (GV)` | `IDENTIFY (ID)` | `PROTECT (PR)` | `DETECT (DE)` | `RESPOND (RS)` | `RECOVER (RC)`
- **Interactive Maturity Scoring**: Rate current & target maturity levels (0%, 25%, 50%, 75%, 100%) with evidence documentation notes.
- **Implementation Tiers Assessment**: Evaluate organizational risk management practices (Tiers 1-4) at the Category level.
- **AI-Powered Evidence Analysis**: Leverages **Google Gemini AI** to automatically evaluate audit evidence notes and suggest maturity scores with tailored remediation guidance.
- **Real-Time Visual Analytics**: Interactive Radar Charts and progress bars visualizing maturity across functions.
- **Gap Analysis Matrix**: Automatically detects severity gaps (High, Medium, Low) between current vs. target scores.
- **Assessor Signature & Sign-Off**: Official assessor authorization module (Lead Assessor, Title, Org, Date, and Digital Signature line).
- **Executive PDF Report Export**: Generates client-ready, downloadable PDF reports complete with executive summaries, gap tables, and signed authorization blocks.
- **1-Click Demo Mode**: Built-in test data loader for instantaneous live demonstrations.
- **Resilient Offline Fallback**: Client-side fallback framework ensures seamless operation even during network outages.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 (Vite) with TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Data Visualization**: Recharts (Radar Chart)
- **PDF Generation**: `@react-pdf/renderer`

### Backend
- **API Framework**: FastAPI (Python 3)
- **Database**: SQLAlchemy ORM with SQLite
- **AI Engine**: Google Gemini API (`google-generativeai`)

---

## 📸 Application Screenshots & Flow

1. **Dashboard**: Interactive radar chart summarizing current vs target maturity across all 6 NIST CSF functions.
2. **Maturity Wizard**: Detailed subcategory scoring, evidence entry, and AI analysis.
3. **Tiers Assessment**: Category-level risk management tier evaluation (Tiers 1-4).
4. **Gap Analysis**: Detailed table highlighting severity levels and AI recommendations.
5. **PDF Exporter**: Executive PDF report generation with official Assessor Signature block.

---

## ⚡ Quick Start & Installation

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python seed.py
uvicorn main:app --reload --port 8000
```
*API will run at `http://localhost:8000` with Interactive Docs at `http://localhost:8000/docs`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend will run at `http://localhost:5173`*

---


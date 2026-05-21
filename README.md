# Talvo – AI Resume Analyzer

A modern, interactive resume analysis and interview preparation platform that transforms static CVs into structured engineering insight.

Join our community for updates and support!
🌐 **Live Demo**

Experience Talvo in your browser: [talvo-ai-resume-analyzer.vercel.app](https://talvo-ai-resume-analyzer.vercel.app/)

## 💡 Project Purpose

Navigating job descriptions and tuning a resume to fit highly specific engineering roles can often feel like a guessing game. Traditional ATS scanners provide ambiguous scores without explaining the logical gaps in a candidate's profile or providing a clear path forward.

Talvo bridges this gap by acting as an automated technical interviewer and hiring manager. By extracting data directly from PDF resumes, analyzing self-descriptions, and mapping them cleanly against target job specifications, Talvo creates a deeply hyper-tailored profile evaluation. It doesn't just show you where you fall short—it maps out an actionable roadmap to help you prepare for the exact role you want.

## ✨ Features

| Feature | Description |
| --- | --- |
| **Parsing Engine** | Directly extracts raw text values from binary PDF payloads asynchronously using a server-side byte buffer pipeline. |
| **Deterministic AI Scoring** | Leverages structural evaluation to assign a deterministic match score between 0 and 100 based entirely on the targeted job description. |
| **Targeted Interview Generation** | Synthesizes highly granular technical questions (detailing intention and optimal technical responses) along with behavioral questions matching the STAR method architecture. |
| **Structured Skill Gap Analysis** | Pinpoints exact technologies or concepts absent from your candidate profile and flags them under explicit severity tiers (`low`, `medium`, `high`). |
| **3-Day Actionable Prep Blueprint** | Generates a daily focused curriculum packed with concrete execution steps tailored to patch found profile vulnerabilities. |
| **State Persistence Dashboard** | Provides historical lookups for previous reports while sorting entries cleanly using database-level projection to cut out redundant over-fetching overhead. |
| **Secure Token Authentication** | Guards system operations using JWT route interception paired with blacklisting mechanics for sound cryptographic validation. |

## 🛠️ Tech Stack

### Frontend

* **Framework:** React 19
* **Build Tool:** Vite 7
* **Styling Modules:** SCSS (Structured Modular Component Styles)
* **Routing Engine:** React Router

### Backend

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database Layer:** MongoDB (via Mongoose ODM)
* **Execution Engine:** Gemini 2.5 Flash (`gemini-2.5-flash`)

### Utilities & Validation

* **Schema Validation:** Zod & Zod-to-JSON-Schema
* **Document Extractors:** PDF-Parse
* **Authorization:** JSON Web Tokens (JWT)

## 🚀 Quick Start

Follow these steps to spin up a fully isolated environment locally:

### Prerequisites

* Node.js (v18.x or higher)
* MongoDB instance (Local daemon or Atlas Cluster connection URL)

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/Shadowblue3/Talvo---AI-resume-analyzer.git
cd Talvo---AI-resume-analyzer

# 2. Configure and Boot the Backend Environment
cd backend
npm install

# Create a local environment template
cat <<EOF > .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_cryptographic_jwt_key
GEMMA_API_KEY=your_gemini_api_key
CORS_ORIGIN=http://localhost:5173
EOF

# Fire up the backend dev listener
npm run dev

# 3. Configure and Boot the Frontend Module
# Open a secondary terminal instance at the project root
cd frontend
npm install

# Define your environment variables
cat <<EOF > .env
VITE_API_BASE_URL=http://localhost:5000/api
EOF

# Fire up the local Vite test server
npm run dev

```

Open `http://localhost:5173/` inside your browser to interact with the build locally.

## 🏗️ Architecture

Talvo relies on a decoupled architecture segregating state validation, persistent record updates, and pure AI parsing schemas.

```text
backend/
├── src/
│   ├── config/          # Configurations & environment bindings
│   ├── controllers/     # API request routers and logic flows
│   ├── db/              # Persistent database connection setups
│   ├── middlewares/     # Authentication guards & storage interceptors
│   ├── models/          # Structured Mongoose DB collections
│   ├── routes/          # Express route registration trees
│   └── services/        # Third-party wrappers (Zod validation & Gemini pipelines)

```

### How It Works

1. **Text Extraction:** When a user uploads a resume, the backend handles the multi-part file stream, intercepting the raw buffer data and passing it directly into `pdf-parse` to convert the binary payload into deterministic string text.
2. **Strict Schema Constraints:** The application builds an explicit structure via a Zod schema defining the output arrays (`technicalQuestions`, `behavioralQuestions`, `skillGaps`, `preparationPlan`). This schema object is transformed into a clean JSON Schema definition using `zod-to-json-schema` and passed to the Google Generative AI API configuration to enforce reliable structured outputs.
3. **Structured Response Generation:** The backend sends the text alongside the job description to the `gemini-2.5-flash` model under strict runtime parameters forcing a standard `application/json` content type.
4. **Validation and Insertion:** The generated JSON text block passes directly through a server-side Zod validation checkpoint (`interviewReportSchema.parse`) to confirm structure compliance before saving the finalized report into MongoDB Atlas.

## 🤝 Contributing

We welcome practical engineering contributions to improve system performance. Whether you want to refine our prompt parameters, optimize file handling streams, or enhance front-end data handling logic:

1. Fork the project repository.
2. Create your feature branch (`git checkout -b feature/OptimalPerformance`).
3. Commit structural modifications (`git commit -m 'Add optimal performance feature'`).
4. Push to your branch origin (`git push origin feature/OptimalPerformance`).
5. Open a detailed Pull Request explaining your logic.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

import React, { useState, useEffect } from 'react';
import { useInterview } from '../hooks/useInterview';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../auth/components/Loader';
import '../analysis.scss';

// ── Mock Database Record ──
// const mockDBData = {
//   _id: "6a05679e68abd3a4de7d7f56",
//   jobDescription: "We are seeking a MERN Stack Developer to build and maintain robust web applications. Experience with React, Node.js, Express, and MongoDB is required. Familiarity with caching and queues is a plus.",
//   selfDescription: "B.Tech CSE (3rd Year) student at Techno Main Salt Lake and Smart India Hackathon finalist. Strong background in JavaScript and building full-stack web applications.",
//   matchScore: 85,
//   technicalQuestions: [
//     { 
//       question: "You mentioned building full-stack applications with the MERN stack. Can you walk me through the authentication flow you implemented?",
//       intention: "This question assesses the candidate's understanding of full-stack integration, security practices (JWT, sessions), and state management.",
//       answer: "An ideal answer would describe: 1. **Registration:** Hashing passwords using bcrypt before saving to MongoDB. 2. **Login:** Verifying credentials and issuing a JWT. 3. **Client-side:** Storing the JWT securely (HttpOnly cookies or memory) and attaching it to subsequent API requests."
//     },
//     { 
//       question: "How do you handle state management in complex React applications?",
//       intention: "Evaluates knowledge of React's rendering lifecycle and architectural decisions between Context API, Redux, or Zustand.",
//       answer: "A strong response discusses the tradeoffs. For example, using local state for UI toggles, Context API for low-frequency updates (theme, auth), and Redux/Zustand for high-frequency, complex global state to prevent unnecessary re-renders."
//     }
//   ],
//   behavioralQuestions: [
//     { 
//       question: "Congratulations on being a Smart India Hackathon 2025 Finalist! Could you describe a major roadblock your team faced and how you overcame it?",
//       intention: "This question aims to understand the candidate's problem-solving skills, teamwork under pressure, and resilience.",
//       answer: "A good STAR (Situation, Task, Action, Result) response would detail: *Situation*: A specific technical bug or scope creep during the hackathon. *Action*: How the candidate mediated the issue, pivoted the strategy, or debugged the problem. *Result*: Delivering the working prototype on time."
//     }
//   ],
//   skillGaps: [
//     { skill: "Professional MERN Experience (3+ years)", severity: "high" },
//     { skill: "Enterprise CI/CD Pipelines", severity: "medium" },
//     { skill: "Redis Caching", severity: "low" },
//     { skill: "Message Queues (RabbitMQ/Kafka)", severity: "medium" }
//   ],
//   preparationPlan: [
//     { 
//       day: 1,
//       focus: "React & Frontend Architecture Deep Dive",
//       tasks: [
//         "Review Advanced Hooks (useMemo, useCallback) to optimize renders.",
//         "Build a small mock application integrating JWT authentication.",
//         "Practice explaining the Virtual DOM out loud."
//       ]
//     },
//     { 
//       day: 2,
//       focus: "Backend System Design & Scaling",
//       tasks: [
//         "Study indexing strategies in MongoDB.",
//         "Set up a basic Redis cache layer on an Express route.",
//         "Review RESTful API best practices and error handling middleware."
//       ]
//     }
//   ],
//   user: "69f11b4d785c1a97884dc5fd",
//   createdAt: "2026-05-14T06:11:42.743+00:00",
//   updatedAt: "2026-05-14T06:11:42.743+00:00",
//   __v: 0
// };

// ── Component ──────────────────────────────────────────────────


const AnalysisReport = () => {
  const { report, loading, getReportById, getAllReports } = useInterview()
  const {interviewID} = useParams()
  const data = report
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (interviewID) {
      getReportById(interviewID);
    } else {
      getAllReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewID]);
  if (loading || !data) {
    return (
      <Loader />
    );
  }

  const tabs = [
    { id: 'overview', label: 'Match Overview' },
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'plan', label: 'Preparation Plan' }
  ];

  // Explicitly set the initial state to 'overview'

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="rendered-content fade-in-key">
            <div className="score-header">
              <div className="score-circle">
                <span className="score-value">{data.matchScore}</span>
                <span className="score-label">Match Score</span>
              </div>
              <div className="score-text">
                <h2>Analysis Complete</h2>
                <p>Based on your profile, you are a strong candidate for this role. Review your customized prep guide below.</p>
              </div>
            </div>

            <div className="info-block">
              <h3>Target Job Description</h3>
              <p>{data.jobDescription}</p>
            </div>

            <div className="info-block">
              <h3>Your Profile Summary</h3>
              <p>{data.selfDescription}</p>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="rendered-content fade-in-key">
            <h2>Technical Interview Prep</h2>
            <p>Anticipated technical questions based on your background and the job requirements:</p>
            <div className="question-list">
              {data.technicalQuestions.map((item, i) => (
                <div key={i} className="question-card">
                  <p className="q-text"><strong>Q:</strong> {item.question}</p>
                  <div className="q-meta">
                    <div className="q-intention">
                      <strong>Interviewer's Intention:</strong> {item.intention}
                    </div>
                    <div className="q-answer">
                      <strong>Ideal Answer Structure:</strong>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'behavioral':
        return (
          <div className="rendered-content fade-in-key">
            <h2>Behavioral & Cultural Fit</h2>
            <p>Prepare the STAR method for these expected behavioral questions:</p>
            <div className="question-list">
              {data.behavioralQuestions.map((item, i) => (
                <div key={i} className="question-card border-violet">
                  <p className="q-text"><strong>Q:</strong> {item.question}</p>
                  <div className="q-meta">
                    <div className="q-intention">
                      <strong>Interviewer's Intention:</strong> {item.intention}
                    </div>
                    <div className="q-answer">
                      <strong>Ideal Answer Structure:</strong>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'plan':
        return (
          <div className="rendered-content fade-in-key">
            <h2>Your Action Plan</h2>
            <p>Follow this timeline to close the gap between your current resume and the target role:</p>
            <div className="timeline">
              {data.preparationPlan.map((item, i) => (
                <div key={i} className="timeline-step">
                  <div className="day-badge">Day {item.day}</div>
                  <strong className="step-focus">{item.focus}</strong>
                  <ul className="task-list">
                    {item.tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="report-page-wrapper animate-fade-in">
      <h1 className="report-main-header">AI Generated Report</h1>

      <div className="analysis-report-container">

        {/* ── Left Column: Navigation ── */}
        <div className="report-col col-left">
          <nav className="section-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Middle Column: Main Content ── */}
        <div className="report-col col-main">
          <div className="main-content-wrapper">
            <div key={activeTab}>
              {renderContent()}
            </div>
          </div>
        </div>

        {/* ── Right Column: Skill Gaps ── */}
        <div className="report-col col-right">
          <h3 className="right-heading">Skill Gaps</h3>
          <div className="skill-pills-container">
            {data.skillGaps.map((gap, index) => (
              <span key={index} className={`skill-pill severity-${gap.severity}`}>
                {gap.skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisReport;
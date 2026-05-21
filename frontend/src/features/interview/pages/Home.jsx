import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { useInterview } from '../hooks/useInterview';
import AnalysisLoading from '../components/AnalysisLoading';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/Auth.context';
import { useAuth } from '../../auth/hooks/useAuth';
import '../home.scss';

// ── Icons (Inline SVGs) ───────────
const AnalyzeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

// ── Allowed MIME types & extensions ──────────────────────────
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// ── Helpers ──────────────────────────────────────────────────
const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const validateFile = (file) => {
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
    return 'Invalid file type. Please upload a PDF, DOC, or DOCX file.';
  }
  if (file.size > MAX_SIZE_BYTES) {
    return `File is too large (${formatBytes(file.size)}). Maximum allowed size is 5 MB.`;
  }
  return null; // valid
};

// ── Main Component ───────────────────────────────────────────
const Home = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');

  const context = useContext(AuthContext)
  const { user } = context

  const {handleLogout} = useAuth()

  const { loading, generateReport, reports, getAllReports } = useInterview()
  useEffect(() => {
    console.log(reports)
  })


  const navigate = useNavigate()

  // ── File upload state ──────────────────────────────────────
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // ── File handling logic ────────────────────────────────────
  const handleFile = useCallback((file) => {
    setUploadError('');
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input value so the same file can be re-selected after removal
    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setUploadError('');
  };

  // ── Drag & Drop handlers ───────────────────────────────────
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleLogoutfunction = async ()=>{
    const resposne = await handleLogout()
    navigate("/login")
  }

  // Handle submit
  const runAIAnalysis = async () => {
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data._id}`)
  }

  if (loading) {
    return (
      <AnalysisLoading />
    )
  }

  return (
    <div className="talvo-home">
      <div className="noise-layer"></div>

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">Talvo</div>
          <div className="brand-tag">Workspace</div>
        </div>

        <nav className="nav-menu">
          <div className="nav-label">Main Menu</div>

          <div
            className={`nav-item ${activeTab === 'analyze' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyze')}
          >
            <AnalyzeIcon />
            Analyze Resume
          </div>

          <div
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <HistoryIcon />
            History
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="user-info">
              <span className="username">{user.username}</span>
              <span className="plan">Pro Member</span>
            </div>
          </div>
          <button className="settings-btn" title="Logout" onClick={() => {handleLogoutfunction}}>
            <img src="/your-logout-icon.svg" alt="Logout" style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="main-content">
        {activeTab === 'analyze' && (
          <div className="tab-content animate-fade-in">
            <div className="content-header">
              <h1>Analyze a new resume</h1>
              <p>Upload your document and provide context to get highly tailored AI feedback.</p>
            </div>

            <div className="analysis-form">
              {/* 1. File Upload Zone */}
              <div
                className={`upload-zone ${isDragging ? 'dragging' : ''} ${resumeFile ? 'has-file' : ''}`}
                onDragOver={!resumeFile ? handleDragOver : undefined}
                onDragLeave={!resumeFile ? handleDragLeave : undefined}
                onDrop={!resumeFile ? handleDrop : undefined}
                onClick={!resumeFile ? () => fileInputRef.current?.click() : undefined}
                role={!resumeFile ? 'button' : undefined}
                tabIndex={!resumeFile ? 0 : undefined}
                onKeyDown={!resumeFile ? (e) => e.key === 'Enter' && fileInputRef.current?.click() : undefined}
                aria-label={!resumeFile ? 'Upload resume file' : undefined}
              >
                {/* Icon: upload arrow → file icon */}
                <div className="upload-icon">
                  {resumeFile ? <FileIcon /> : <UploadIcon />}
                </div>

                {/* Heading */}
                <h3>{resumeFile ? 'Resume Uploaded' : isDragging ? 'Drop it here!' : 'Drag & Drop your resume here'}</h3>

                {/* Sub-text: formats → file size */}
                <p>{resumeFile ? formatBytes(resumeFile.size) : 'Supported formats: PDF, DOC, DOCX (Max 5MB)'}</p>

                {/* Button: Browse Files — disabled once a file is uploaded */}
                <button
                  className="btn-upload"
                  disabled={!!resumeFile}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  title={resumeFile ? resumeFile.name : 'Browse files'}
                >
                  {resumeFile ? resumeFile.name : 'Browse Files'}
                </button>

                {/* Clear button — only visible after a file is uploaded */}
                {resumeFile && (
                  <button
                    className="btn-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    title="Remove uploaded file"
                  >
                    ✕ Clear &amp; Re-upload
                  </button>
                )}

                {/* Hidden native file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
              </div>

              {/* ── Validation error ── */}
              {uploadError && (
                <p className="upload-error">{uploadError}</p>
              )}

              {/* 2. Additional Context Textareas */}
              <div className="context-grid">
                <div className="input-group">
                  <label>Target Job Description</label>
                  <textarea
                    placeholder="Paste the job description here. Talvo will calculate your ATS match score and suggest missing keywords..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="input-group">
                  <label>Self Description &amp; Goals</label>
                  <textarea
                    placeholder="Tell the AI about your goals. E.g., 'I am transitioning from Marketing to Data Science and want to highlight my analytical skills...'"
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* 3. Submit Action */}
              <div className="submit-row">
                <button className="btn-analyze" disabled={!resumeFile}
                  onClick={runAIAnalysis}>
                  Run AI Analysis &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="tab-content animate-fade-in">
            <div className="content-header">
              <h1>Analysis History</h1>
              <p>Review your previous resume scans and track improvements.</p>
            </div>

            {!reports || reports.length === 0 ? (
              <div style={{ color: '#7a7f8e', fontFamily: 'DM Mono', marginTop: '40px' }}>
                No history found yet. Analyze a resume to get started.
              </div>
            ) : (
              <div className="history-grid-wrapper">
                <div className="history-grid">
                  {reports.map((report, index) => (
                    <div
                      key={report._id || index}
                      className="history-card"
                      onClick={() => navigate(`/interview/${report._id}`)}
                    >
                      <div className="card-header">
                        <h3 className="job-title">{report.title}</h3>
                        <div className={`score-badge ${report.matchScore >= 80 ? 'high' : report.matchScore >= 50 ? 'medium' : 'low'}`}>
                          {report.matchScore}% Match
                        </div>
                      </div>

                      <div className="card-footer">
                        <div className="date-info">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>{formatDate(report.createdAt)}</span>
                        </div>
                        <div className="view-action">View Report &rarr;</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
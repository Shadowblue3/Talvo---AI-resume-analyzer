import React, { useState, useEffect } from 'react';
import './analysis-loading.scss';

const DocumentScannerSVG = () => (
  <svg 
    viewBox="0 0 100 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="hologram-doc"
  >
    {/* Glowing background layer */}
    <rect x="10" y="10" width="80" height="100" rx="8" fill="rgba(99,210,255,0.05)" />
    
    {/* Main document outline */}
    <rect x="10" y="10" width="80" height="100" rx="8" stroke="rgba(99,210,255,0.4)" strokeWidth="2" strokeDasharray="4 4" />
    
    {/* Top accent */}
    <rect x="10" y="10" width="80" height="20" rx="8" fill="rgba(99,210,255,0.1)" />
    <line x1="10" y1="30" x2="90" y2="30" stroke="rgba(99,210,255,0.4)" strokeWidth="2" />
    
    {/* Abstract text lines */}
    <rect x="20" y="45" width="40" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="20" y="57" width="60" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
    <rect x="20" y="69" width="50" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
    
    <rect x="20" y="85" width="20" height="4" rx="2" fill="rgba(155,109,255,0.4)" />
    <rect x="45" y="85" width="35" height="4" rx="2" fill="rgba(155,109,255,0.4)" />
    
    {/* Corner nodes */}
    <circle cx="10" cy="10" r="3" fill="#63d2ff" />
    <circle cx="90" cy="10" r="3" fill="#63d2ff" />
    <circle cx="10" cy="110" r="3" fill="#63d2ff" />
    <circle cx="90" cy="110" r="3" fill="#63d2ff" />
  </svg>
);

const AnalysisLoading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing AI engine...');

  useEffect(() => {
    // Milestones for text changes
    const statuses = [
      { p: 0, text: 'Initializing AI engine...' },
      { p: 15, text: 'Extracting document payload...' },
      { p: 35, text: 'Parsing historical timelines...' },
      { p: 50, text: 'Running ATS keyword match...' },
      { p: 70, text: 'Evaluating impact metrics...' },
      { p: 85, text: 'Synthesizing final insights...' },
      { p: 98, text: 'Finalizing report...' }
    ];

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1; // You can make this random (e.g. prev + Math.random() * 3) for realism
        
        if (next >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 500); // Small delay at 100% before firing completion
          }
          return 100;
        }

        // Update status text based on progress thresholds
        const currentStatus = statuses.slice().reverse().find((s) => next >= s.p);
        if (currentStatus) {
          setStatus(currentStatus.text);
        }

        return next;
      });
    }, 60); // Roughly 6 seconds total

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="analysis-loading-container">
      <div className="loader-content">
        
        {/* Holographic Scanner Visual */}
        <div className="scanner-assembly">
          <div className="beam-glow"></div>
          <DocumentScannerSVG />
          <div className="laser-line"></div>
        </div>

        {/* Dynamic Data Display */}
        <div className="data-display">
          <div className="progress-number">
            {Math.floor(progress)}<span className="percent">%</span>
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="status-terminal">
            <span className="status-prompt">{'>'}</span>
            <span className="status-text">{status}</span>
            <span className="status-cursor">_</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisLoading;
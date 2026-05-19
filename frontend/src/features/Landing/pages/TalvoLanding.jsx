import React from 'react';
import '../landing.scss';
import {Link} from 'react-router-dom'

const TalvoLanding = () => {
  return (
    <main className="talvo-landing">
      <div className="noise-layer"></div>
      
      <div className="hero-container">
        {/* Left Column: Content */}
        <div className="hero-content">
          <div className="brand-header">
            <h1 className="brand-logo">Talvo</h1>
            <span className="brand-subtitle">AI RESUME ANALYZER</span>
          </div>
          
          <h2 className="main-heading">
            Your resume, decoded <br />
            by machine intelligence.
          </h2>
          
          <p className="description">
            Upload once. Get instant AI-powered feedback, <br />
            ATS scoring, and job-match analysis in seconds.
          </p>
          
          <div className="cta-group">
            <Link to={"/login"}><button className="btn btn-primary">Get Started &rarr;</button></Link>
            <button className="btn btn-secondary">See how it works</button>
          </div>
        </div>

        {/* Right Column: Illustration (CSS Art Approximation) */}
        <div className="hero-illustration">
          
          {/* Abstract Robot */}
          <div className="abstract-robot">
            <div className="robot-head">
              <div className="eye left"></div>
              <div className="eye right"></div>
            </div>
            <div className="robot-body">
              <div className="scanner-line"></div>
            </div>
          </div>

          {/* Main Resume Card */}
          <div className="resume-card">
            <div className="resume-header">
              <div className="avatar"></div>
              <div className="name-line"></div>
            </div>
            <div className="resume-section">
              <div className="section-title">EXPERIENCE</div>
              <div className="text-line long"></div>
              <div className="text-line medium"></div>
              <div className="text-line short"></div>
            </div>
            <div className="resume-section">
              <div className="section-title">SKILLS</div>
              <div className="text-line long"></div>
              <div className="text-line medium"></div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="floating-badges">
            <div className="badge badge-cyan" style={{ top: '10%', right: '-20px' }}>ATS Score: 94%</div>
            <div className="badge badge-violet" style={{ top: '25%', right: '-30px' }}>Skills match: ✓</div>
            <div className="badge badge-blue" style={{ top: '40%', right: '-10px' }}>Keywords found</div>
            <div className="badge badge-cyan" style={{ top: '55%', right: '-25px' }}>Impact: Strong</div>
            <div className="badge badge-violet" style={{ top: '70%', right: '-5px' }}>Format: Optimal</div>
          </div>

          {/* Score Indicator */}
          <div className="score-indicator">
            <svg viewBox="0 0 100 100" className="score-ring">
              <circle cx="50" cy="50" r="45" className="ring-bg"></circle>
              <circle cx="50" cy="50" r="45" className="ring-progress"></circle>
            </svg>
            <div className="score-text">
              <span className="number">94</span>
              <span className="label">SCORE</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default TalvoLanding;
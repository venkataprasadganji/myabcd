import React from 'react';
import '../styles/CurrentAffairsCard.css';
import ReactMarkdown from 'react-markdown';

const CurrentAffairCard = ({ title, summary, url, tags = [], topic, created_at, mcqs = [], mains_questions = [] }) => {
  const formatDate = (isoString) => new Date(isoString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="ca-card">
      <div className="ca-header">
        <span className="ca-topic">{topic}</span>
        <span className="ca-date">🗓️ {formatDate(created_at)}</span>
      </div>

      <h3 className="ca-title">
        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      </h3>

      <ReactMarkdown >
        {summary}
      </ReactMarkdown>

      <div className="ca-tags">
        {(Array.isArray(tags) && tags.length === 1 && typeof tags[0] === 'string' && tags[0].includes(',')
          ? tags[0].split(',')
          : tags
        ).map((tag, i) => (
          <span key={i} className="ca-tag">{tag.trim()}</span>
        ))}
      </div>

      {mcqs.length > 0 && (
        <div className="ca-section">
          <h4>📘 MCQs</h4>
          <ul className="ca-mcq-list">
            {mcqs.map((q, i) => (
              <li key={i}>
                <strong>Q{i + 1}:</strong> {q.question}<br />
                <em>Answer:</em> {q.answer}<br />
                <em>Explanation:</em> {q.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mains_questions.length > 0 && (
        <div className="ca-section">
          <h4>📝 Mains Questions</h4>
          <ul className="ca-mains-list">
            {mains_questions.map((q, i) => (
              <li key={i}>
                <strong>Q{i + 1}:</strong> {q.question}<br />
                <em>Why it matters:</em> {q.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="ca-footer">
        <button className="ca-mindmap-btn" onClick={() => alert('🧠 Mind Map View Placeholder')}>🧠 Show as Mind Map</button>
      </div>
    </div>
  );
};

export default CurrentAffairCard;

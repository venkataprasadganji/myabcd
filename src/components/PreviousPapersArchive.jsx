import React, { useState } from "react";
import '../styles/PreviousPapersArchive.css'; // Import the new CSS file

// Dummy data for demonstration. In a real app, this might come from an API or Firestore.
// Ensure each 'id' is truly unique if you have multiple entries for the same year
const papers = [
  {
    id: '2024-data-entry-1', // Unique ID for this specific entry
    year: 2024,
    prelims: {
      "General Studies Paper I": "https://upsc.gov.in/sites/default/files/QP-CSP-24-GS-I-260524.pdf",
      "CSAT Paper II": "https://upsc.gov.in/sites/default/files/QP-CSP-24-CSAT-260524.pdf",
    },
    mains: {
      Essay: "https://upsc.gov.in/sites/default/files/QP-MAINS24-ESSAY-150924.pdf",
      "GS Paper I": "https://upsc.gov.in/sites/default/files/QP-MAINS24-GS1-160924.pdf",
      "GS Paper II": "https://upsc.gov.in/sites/default/files/QP-MAINS24-GS2-160924.pdf",
      "GS Paper III": "https://upsc.gov.in/sites/default/files/QP-MAINS24-GS3-170924.pdf",
      "GS Paper IV": "https://upsc.gov.in/sites/default/files/QP-MAINS24-GS4-170924.pdf",
      "Optional Paper I": "#",
      "Optional Paper II": "#",
    },
  },
  {
    id: '2023-data-entry-1', // Unique ID
    year: 2023,
    prelims: {
      "General Studies Paper I": "https://upsc.gov.in/sites/default/files/QP-CSP-23-GS-I.pdf",
      "CSAT Paper II": "https://upsc.gov.in/sites/default/files/QP-CSP-23-CSAT-280523.pdf",
    },
    mains: {
      Essay: "https://upsc.gov.in/sites/default/files/QP-MAINS23-ESSAY-150923.pdf",
      "GS Paper I": "https://upsc.gov.in/sites/default/files/QP-MAINS23-GS1-160923.pdf",
      "GS Paper II": "https://upsc.gov.in/sites/default/files/QP-MAINS23-GS2-160923.pdf",
      "GS Paper III": "https://upsc.gov.in/sites/default/files/QP-MAINS23-GS3-170923.pdf",
      "GS Paper IV": "https://upsc.gov.in/sites/default/files/QP-MAINS23-GS4-170923.pdf",
      "Optional Paper I": "#",
      "Optional Paper II": "#",
    },
  },
  {
    id: '2022-data-entry-1', // Unique ID
    year: 2022,
    prelims: {
      "General Studies Paper I": "https://upsc.gov.in/sites/default/files/QP-CSP-22-GS-I.pdf",
      "CSAT Paper II": "https://upsc.gov.in/sites/default/files/QP-CSP-22-CSAT-050622.pdf",
    },
    mains: {
      Essay: "https://upsc.gov.in/sites/default/files/QP-MAINS22-ESSAY-160922.pdf",
      "GS Paper I": "https://upsc.gov.in/sites/default/files/QP-MAINS22-GS1-170922.pdf",
      "GS Paper II": "https://upsc.gov.in/sites/default/files/QP-MAINS22-GS2-170922.pdf",
      "GS Paper III": "https://upsc.gov.in/sites/default/files/QP-MAINS22-GS3-180922.pdf",
      "GS Paper IV": "https://upsc.gov.in/sites/default/files/QP-MAINS22-GS4-180922.pdf",
      "Optional Paper I": "#",
      "Optional Paper II": "#",
    },
  },
  {
    id: '2021-data-entry-1', // Unique ID
    year: 2021,
    prelims: {
      "General Studies Paper I": "https://upsc.gov.in/sites/default/files/QP-CSP-21-GS-I.pdf",
      "CSAT Paper II": "https://upsc.gov.in/sites/default/files/QP-CSP-21-CSAT-101021.pdf",
    },
    mains: {
      Essay: "https://upsc.gov.in/sites/default/files/QP-MAINS21-ESSAY-070122.pdf",
      "GS Paper I": "https://upsc.gov.in/sites/default/files/QP-MAINS21-GS1-080122.pdf",
      "GS Paper II": "https://upsc.gov.in/sites/default/files/QP-MAINS21-GS2-080122.pdf",
      "GS Paper III": "https://upsc.gov.in/sites/default/files/QP-MAINS21-GS3-090122.pdf",
      "GS Paper IV": "https://upsc.gov.in/sites/default/files/QP-MAINS21-GS4-090122.pdf",
      "Optional Paper I": "#",
      "Optional Paper II": "#",
    },
  },
  {
    id: '2020-data-entry-1', // Unique ID
    year: 2020,
    prelims: {
      "General Studies Paper I": "https://upsc.gov.in/sites/default/files/QP-CSP-20-GS-I.pdf",
      "CSAT Paper II": "https://upsc.gov.in/sites/default/files/QP-CSP-20-CSAT-041020.pdf",
    },
    mains: {
      Essay: "https://upsc.gov.in/sites/default/files/QP-MAINS20-ESSAY-080121.pdf",
      "GS Paper I": "https://upsc.gov.in/sites/default/files/QP-MAINS20-GS1-090121.pdf",
      "GS Paper II": "https://upsc.gov.in/sites/default/files/QP-MAINS20-GS2-090121.pdf",
      "GS Paper III": "https://upsc.gov.in/sites/default/files/QP-MAINS20-GS3-100121.pdf",
      "GS Paper IV": "https://upsc.gov.in/sites/default/files/QP-MAINS20-GS4-100121.pdf",
      "Optional Paper I": "#",
      "Optional Paper II": "#",
    },
  },
];

const PreviousPapersArchive = () => {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const toggleItem = (id) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="previous-papers-container">
      <div className="max-width-container">
        <h1 className="page-title">
          {/* Book Open Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon-main-title"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          UPSC Previous Year Papers Archive
        </h1>

        <div className="year-cards-grid">
          {papers.map((item) => {
            const isExpanded = expandedItemId === item.id;
            return (
              <div
                key={item.id}
                className={`year-card ${isExpanded ? 'expanded' : ''}`}
              >
                {/* Card Header */}
                <div
                  className="card-header"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="card-header-content">
                    {/* Calendar Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon-calendar"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <span>{item.year}</span>
                  </div>
                  {isExpanded ? (
                    // Chevron Up Icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon-chevron"
                    >
                      <path d="M18 15l-6-6-6 6"></path>
                    </svg>
                  ) : (
                    // Chevron Down Icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon-chevron"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  )}
                </div>

                {/* Card Body (Collapsible Content) */}
                {/* The card-body content is conditionally rendered based on isExpanded */}
                <div className={`card-body ${isExpanded ? 'active' : ''}`}>
                  {item.prelims && (
                    <div className="section-papers">
                      <h3 className="section-title prelims-title">
                        {/* File Text Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-section-title"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        Prelims Papers
                      </h3>
                      <ul className="paper-list">
                        {Object.entries(item.prelims).map(([title, link]) => (
                          <li key={title}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="paper-link prelims-link"
                            >
                              {/* PDF Icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon-pdf"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                              </svg>
                              <span className="paper-title">{title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.mains && (
                    <div className="section-papers">
                      <h3 className="section-title mains-title">
                        {/* File Text Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon-section-title"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        Mains Papers
                      </h3>
                      <ul className="paper-list">
                        {Object.entries(item.mains).map(([title, link]) => (
                          <li key={title}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="paper-link mains-link"
                            >
                              {/* PDF Icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon-pdf"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                              </svg>
                              <span className="paper-title">{title}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviousPapersArchive;

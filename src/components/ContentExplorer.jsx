import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  FaBook,
  FaClipboard,
  FaRobot,
  FaStickyNote,
  FaChevronRight,
  FaChevronDown,
  FaFileAlt,
  FaRegFileAlt
} from "react-icons/fa";
import "../styles/ContentExplorer.css";

const subjects = ["Polity", "Economy", "History", "Geography"];

const referenceData = {
  Polity: {
    NCERTs: {
      "Class 6": ["Understanding Government", "Key Elements of a Democratic Government"],
    },
    Others: {
      "AI Notes": ["Democracy Simplified"]
    }
  },
  Economy: {
    NCERTs: {
      "Class 9": ["Money and Credit", "People as Resource"],
      "Class 10": ["Globalization"]
    },
    "Standard Books": {
      "Ramesh Singh": ["Fiscal Policy", "Inflation"]
    },
    Others: {
      "AI Notes": ["Budget 2025 Analysis", "Economic Survey Highlights"],
      "My Notes": ["Self Notes on Banking"]
    }
  }
};

const ContentExplorer = () => {
  const [selectedSubject, setSelectedSubject] = useState("Polity");
  const [activeChapter, setActiveChapter] = useState(null);
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  const referenceTypes = referenceData[selectedSubject] || {};

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const renderIcon = (type) => {
    if (type === "NCERTs") return <FaBook className="me-2" />;
    if (type === "Standard Books") return <FaClipboard className="me-2" />;
    if (type === "AI Notes") return <FaRobot className="me-2" />;
    if (type === "My Notes") return <FaStickyNote className="me-2" />;
    return <FaFileAlt className="me-2" />;
  };

  return (
    <div className={`upsc-content-wrapper ${collapsedSidebar ? "collapsed" : ""}`}>
      {/* Top Subject Tabs */}
      <div className="subject-tabs sticky-top glass-tab-bar">
        <Tabs
          id="subject-tabs"
          activeKey={selectedSubject}
          onSelect={(k) => {
            setSelectedSubject(k);
            setActiveChapter(null);
            setExpandedGroups({});
          }}
          className="custom-tab-nav"
        >
          {subjects.map((subject) => (
            <Tab eventKey={subject} title={subject} key={subject} />
          ))}
        </Tabs>
      </div>

      {/* Layout Below Tabs */}
      <div className="upsc-content-layout d-flex">
        {/* Sidebar */}
        <div
          className={`sidebar ${collapsedSidebar ? "collapsed" : ""}`}
          onMouseEnter={() => setCollapsedSidebar(false)}
          onMouseLeave={() => activeChapter && setCollapsedSidebar(true)}
        >
          <div className="sidebar-scroll">
            {Object.entries(referenceTypes).map(([type, entries]) => (
              <div key={type} className="sidebar-section">
                <div
                  className="sidebar-section-header"
                  onClick={() => toggleGroup(type)}
                >
                  {renderIcon(type)}
                  {!collapsedSidebar && (
                    <span className="section-title">{type}</span>
                  )}
                  <span className="ms-auto">
                    {expandedGroups[type] ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                </div>
                {expandedGroups[type] && !collapsedSidebar && (
                  <div className="sidebar-section-body">
                    {Object.entries(entries).map(([source, chapters]) => {
                      const groupKey = `${type}-${source}`;
                      const isSubExpanded = expandedGroups[groupKey];

                      return (
                        <div key={source} className="mb-2">
                          <div
                            className="sub-section-header d-flex align-items-center justify-content-between"
                            onClick={() => toggleGroup(groupKey)}
                          >
                            <strong>{source}</strong>
                            <span>{isSubExpanded ? <FaChevronDown /> : <FaChevronRight />}</span>
                          </div>
                          {isSubExpanded && (
                            <ul className="chapter-list">
                              {chapters.map((ch) => (
                                <li
                                  key={ch}
                                  className={activeChapter === ch ? "active" : ""}
                                  onClick={() => {
                                    setActiveChapter(ch);
                                    setCollapsedSidebar(true);
                                  }}
                                >
                                  <FaRegFileAlt className="me-2" /> {ch}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="content flex-grow-1 p-4">
          {activeChapter ? (
            <div>
              <h4>{activeChapter}</h4>
              <p>This is where the summary, mind map, or notes will appear.</p>
            </div>
          ) : (
            <div>
              <p>Select a chapter from the left to begin exploring the content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentExplorer;

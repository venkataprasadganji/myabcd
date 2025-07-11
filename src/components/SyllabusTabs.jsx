import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  ProgressBar,
  Form,
  Spinner,
} from "react-bootstrap";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/SyllabusTabs.css";
import {
  BsBookHalf,
  BsGrid1X2,
  BsClipboardCheck,
  BsCheckCircleFill,
  BsToggleOn,
  BsToggleOff,
} from "react-icons/bs";
import PuzzleGrid from "./PuzzleGrid";

const SyllabusTabs = () => {
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState("syllabus"); // syllabus | flashcard
  const [syllabus, setSyllabus] = useState({
    prelims: {},
    mains: {},
    optionals: {},
  });
  const [remembered, setRemembered] = useState({});
  const [activeTab, setActiveTab] = useState("prelims");
  const [hideMode, setHideMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadUserProgress(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSyllabus = async () => {
      const ref = doc(db, "syllabi", "UPSC_fully_structured");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setSyllabus(snap.data());
      }
      setLoading(false);
    };
    fetchSyllabus();
  }, []);

  const loadUserProgress = async (uid) => {
    try {
      const ref = doc(db, "users", uid, "syllabus_progress", "UPSC");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setRemembered(snap.data().rememberedKeys || {});
      }
    } catch (err) {
      console.error("Failed to load progress:", err);
    }
  };

  const saveProgress = async (newRemembered) => {
    if (!user) return;
    try {
      const ref = doc(db, "users", user.uid, "syllabus_progress", "UPSC");
      await setDoc(ref, {
        rememberedKeys: newRemembered,
        last_updated: new Date(),
      });
    } catch (err) {
      console.error("Failed to save progress:", err);
    }
  };

  const toggleRemembered = (section, paperKey, index) => {
    const key = `${section}-${paperKey}-${index}`;
    setRemembered((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      saveProgress(updated);
      return updated;
    });
  };

  const calculateProgress = (section) => {
    const sectionData = syllabus[section] || {};
    const allKeys = [];

    Object.entries(sectionData).forEach(([paperKey, content]) => {
      const points = Array.isArray(content?.syllabus)
        ? content.syllabus
        : Array.isArray(content)
        ? content
        : [content];
      points.forEach((_, idx) => {
        allKeys.push(`${section}-${paperKey}-${idx}`);
      });
    });

    const rememberedKeys = allKeys.filter((key) => remembered[key]);
    return {
      total: allKeys.length,
      remembered: rememberedKeys.length,
      percentage: Math.round(
        (rememberedKeys.length / (allKeys.length || 1)) * 100
      ),
    };
  };

  const renderSyllabus = (section) => {
    const sectionData = syllabus[section] || {};
    const progress = calculateProgress(section);
    const sortKeys =
      section === "prelims"
        ? ["Paper I", "Paper II"]
        : [
            "Essay",
            "Paper A",
            "Paper B",
            "General Studies Paper I",
            "General Studies Paper II",
            "General Studies Paper III",
            "General Studies Paper IV",
            "Optional Paper I",
            "Optional Paper II",
          ];

    const sortedEntries = Object.entries(sectionData).sort(([a], [b]) => {
      const indexA = sortKeys.findIndex((key) => key === a.trim());
      const indexB = sortKeys.findIndex((key) => key === b.trim());
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-capitalize">{section} syllabus</h5>
          <Form.Check
            type="switch"
            label="🧠 Memory Mode"
            checked={hideMode}
            onChange={() => setHideMode(!hideMode)}
          />
        </div>

        <ProgressBar
          now={progress.percentage}
          label={`${progress.percentage}%`}
          className="mb-3 rounded-pill"
          variant={
            section === "prelims"
              ? "info"
              : section === "mains"
              ? "warning"
              : "success"
          }
          animated
        />

        <div className={`syllabus-section ${section}`}>
          {sortedEntries.map(([paperKey, content]) => {
            const points = Array.isArray(content?.syllabus)
              ? content.syllabus
              : Array.isArray(content)
              ? content
              : [content];

            return (
              <div className="syllabus-card" key={paperKey}>
                <h6 className="fw-bold">
                  {paperKey}{" "}
                  {points.every((_, i) =>
                    remembered[`${section}-${paperKey}-${i}`]
                  ) && <BsCheckCircleFill className="text-success ms-1" />}
                </h6>
                <ul className="syllabus-points">
                  {points.map((point, idx) => {
                    const key = `${section}-${paperKey}-${idx}`;
                    const isRemembered = remembered[key];

                    return (
                      <li key={key}>
                        <div
                          className={`syllabus-point-item d-flex justify-content-between align-items-start ${
                            isRemembered ? "remembered" : ""
                          }`}
                          onClick={() =>
                            toggleRemembered(section, paperKey, idx)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <span className="text-wrap me-2">
                            {hideMode && !isRemembered
                              ? "🔒 Hidden"
                              : point.length > 150
                              ? point.slice(0, 150) + "..."
                              : point}
                          </span>
                          {isRemembered && (
                            <span className="text-success">
                              <BsCheckCircleFill size={18} />
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" /> Loading syllabus...
      </div>
    );
  }

  return (
    <div className="syllabus-tabs-wrapper">
      {/* Toggle View Mode */}
      
      <div className="view-switch-toggle" onClick={() => setViewMode(viewMode === "syllabus" ? "puzzle" : "syllabus")}>
  <div className={`toggle-btn ${viewMode === "puzzle" ? "puzzle" : "syllabus"}`}>
   
  </div>
  <span className="label">{viewMode === "puzzle" ? "Puzzle Grid" : "Syllabus View"}</span>
</div>


      {/* Conditional View */}
      {viewMode === "puzzle" ? (
        <PuzzleGrid />
      ) : (
        <Tabs
          defaultActiveKey="prelims"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          justify
        >
          <Tab
            eventKey="prelims"
            title={
              <>
                <BsClipboardCheck className="me-1" /> Prelims
              </>
            }
          >
            {renderSyllabus("prelims")}
          </Tab>
          <Tab
            eventKey="mains"
            title={
              <>
                <BsBookHalf className="me-1" /> Mains
              </>
            }
          >
            {renderSyllabus("mains")}
          </Tab>
          <Tab
            eventKey="optionals"
            title={
              <>
                <BsGrid1X2 className="me-1" /> Optionals
              </>
            }
          >
            {renderSyllabus("optionals")}
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export default SyllabusTabs;

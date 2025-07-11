import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { Accordion, Card, Button, Form, ProgressBar } from "react-bootstrap";
import { db } from "../firebase";
import "../styles/SyllabusCard.css";

const SyllabusCard = () => {
  const [prelims, setPrelims] = useState({});
  const [mains, setMains] = useState({});
  const [remembered, setRemembered] = useState({});
  const [hideMode, setHideMode] = useState(false);

  useEffect(() => {
    const fetchSyllabus = async () => {
      const ref = doc(db, "syllabi", "UPSC_fully_structured");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setPrelims(data.prelims || {});
        setMains(data.mains || {});
      }
    };
    fetchSyllabus();
  }, []);

  const handleRememberToggle = (section, paperKey, index) => {
    const key = `${section}-${paperKey}-${index}`;
    setRemembered((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getProgress = (section) => {
    const allKeys = [];
    const content = section === "prelims" ? prelims : mains;

    Object.entries(content).forEach(([paperKey, paperContent]) => {
      const points = Array.isArray(paperContent?.syllabus)
        ? paperContent.syllabus
        : Array.isArray(paperContent)
        ? paperContent
        : [];
      points.forEach((_, index) => {
        allKeys.push(`${section}-${paperKey}-${index}`);
      });
    });

    const rememberedKeys = allKeys.filter((key) => remembered[key]);
    return {
      total: allKeys.length,
      remembered: rememberedKeys.length,
      percentage: Math.round((rememberedKeys.length / (allKeys.length || 1)) * 100)
    };
  };

  const renderPaperContent = (section, paperKey, content) => {
    const points = Array.isArray(content?.syllabus)
      ? content.syllabus
      : Array.isArray(content)
      ? content
      : [content];

    return (
      <ul className="syllabus-list">
        {points.map((point, idx) => {
          const key = `${section}-${paperKey}-${idx}`;
          const isRemembered = remembered[key];
          return (
            <li key={key} className={isRemembered ? "remembered" : ""}>
              <Form.Check
                type="checkbox"
                id={key}
                label={hideMode && !isRemembered ? "🔒 Hidden (Click to reveal)" : point}
                checked={isRemembered}
                onChange={() => handleRememberToggle(section, paperKey, idx)}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="syllabus-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📘 UPSC Prelims & Mains Syllabus</h4>
        <Form.Check
          type="switch"
          id="hideMode"
          label="🧠 Memory Trick Mode"
          checked={hideMode}
          onChange={() => setHideMode(!hideMode)}
        />
      </div>

      {["prelims", "mains"].map((section) => {
        const content = section === "prelims" ? prelims : mains;
        const progress = getProgress(section);
        return (
        <Card className={`mb-4 syllabus-section-card ${section}`}>
  <Card.Body>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h5 className="text-capitalize">
        {section === "prelims" ? "📝 Prelims" : "📚 Mains"} Syllabus
      </h5>
      <Form.Check
        type="switch"
        label="🧠 Memory Mode"
        checked={hideMode}
        onChange={() => setHideMode(!hideMode)}
        className="text-muted small"
      />
    </div>

    <ProgressBar
      now={progress.percentage}
      label={`${progress.percentage}%`}
      variant={section === "prelims" ? "info" : "warning"}
      animated
      className="mb-3 rounded-pill"
    />

    <Accordion alwaysOpen>
      {Object.entries(content).map(([paperKey, paperContent], idx) => {
        const total = Array.isArray(paperContent?.syllabus)
          ? paperContent.syllabus.length
          : Array.isArray(paperContent)
          ? paperContent.length
          : 1;
        const rememberedCount = Object.keys(remembered).filter((key) =>
          key.startsWith(`${section}-${paperKey}-`) && remembered[key]
        ).length;
        const isComplete = rememberedCount === total;

        return (
          <Accordion.Item eventKey={idx.toString()} key={paperKey}>
            <Accordion.Header>
              <span className="me-2">{paperKey}</span>
              {isComplete && <span className="badge bg-success ms-auto">✔ Done</span>}
            </Accordion.Header>
            <Accordion.Body>
              {renderPaperContent(section, paperKey, paperContent)}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  </Card.Body>
</Card>

        );
      })}
    </div>
  );
};

export default SyllabusCard;

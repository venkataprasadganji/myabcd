import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/PuzzleGrid.css";
import CircularProgress from "./CircularProgress";

const PuzzleGrid = () => {
  const [user, setUser] = useState(null);
  const [syllabus, setSyllabus] = useState({});
  const [remembered, setRemembered] = useState({});
  const [section, setSection] = useState("prelims");
  const [paper, setPaper] = useState("");
  const [tiles, setTiles] = useState([]);
  const [hideUnmarked, setHideUnmarked] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const ref = doc(db, "users", u.uid, "syllabus_progress", "UPSC");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setRemembered(snap.data()?.rememberedKeys || {});
        }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "syllabi", "UPSC_fully_structured"));
      if (snap.exists()) {
        const data = snap.data();
        setSyllabus(data);
        const first = Object.keys(data[section])[0];
        setPaper(first);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const content = syllabus?.[section]?.[paper];
    if (!content) return;

    const raw = Array.isArray(content?.syllabus)
      ? content.syllabus
      : Array.isArray(content)
      ? content
      : [content];

    const newTiles = raw.map((point, i) => ({
      id: `${section}-${paper}-${i}`,
      text: point,
    }));

    setTiles(newTiles);
  }, [section, paper, syllabus]);

  const toggle = async (id) => {
    const updated = { ...remembered, [id]: !remembered[id] };
    setRemembered(updated);
    if (user) {
      await setDoc(doc(db, "users", user.uid, "syllabus_progress", "UPSC"), {
        rememberedKeys: updated,
        last_updated: new Date(),
      });
    }
  };

  const rememberedCount = tiles.filter((tile) => remembered[tile.id]).length;
  const progress = Math.round((rememberedCount / (tiles.length || 1)) * 100);

  return (
    <div className="puzzle-container">
      <div className="puzzle-header">
        <div className="selectors">
          <select
            value={section}
            onChange={(e) => {
              const sec = e.target.value;
              setSection(sec);
              const first = Object.keys(syllabus[sec])[0];
              setPaper(first);
            }}
          >
            <option value="prelims">Prelims</option>
            <option value="mains">Mains</option>
            <option value="optionals">Optionals</option>
          </select>

          <select value={paper} onChange={(e) => setPaper(e.target.value)}>
            {(Object.keys(syllabus?.[section] || {})).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="memory-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={hideUnmarked}
              onChange={() => setHideUnmarked(!hideUnmarked)}
            />
            <span className="slider round" />
          </label>
          <span>Memory Mode</span>
        </div>

        <CircularProgress percentage={progress} />
      </div>

      <div className="puzzle-grid">
        {tiles
          .filter((tile) => !hideUnmarked || remembered[tile.id])
          .map((tile) => (
            <div
              key={tile.id}
              className={`puzzle-tile ${remembered[tile.id] ? "remembered" : ""}`}
              onClick={() => toggle(tile.id)}
            >
              {tile.text.length > 120 ? tile.text.slice(0, 120) + "..." : tile.text}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PuzzleGrid;

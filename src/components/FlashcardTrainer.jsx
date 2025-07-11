import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import "../styles/SwipeFlashcards.css";

const FlashcardTrainer = () => {
  const [user, setUser] = useState(null);
  const [syllabus, setSyllabus] = useState({});
  const [remembered, setRemembered] = useState({});
  const [section, setSection] = useState("prelims");
  const [paper, setPaper] = useState("");
  const [cards, setCards] = useState([]);

  // Load user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const snap = await getDoc(doc(db, "users", u.uid, "syllabus_progress", "UPSC"));
        if (snap.exists()) {
          setRemembered(snap.data()?.rememberedKeys || {});
        }
      }
    });
    return () => unsub();
  }, []);

  // Load syllabus
  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "syllabi", "UPSC_fully_structured"));
      if (snap.exists()) {
        const data = snap.data();
        setSyllabus(data);
        const firstKey = Object.keys(data[section])[0];
        setPaper(firstKey);
      }
    };
    load();
  }, []);

  // Load cards for selected paper
  useEffect(() => {
    const items = syllabus?.[section]?.[paper];
    const raw = Array.isArray(items?.syllabus) ? items.syllabus : Array.isArray(items) ? items : [items];

    const filtered = raw
      .map((text, i) => ({
        id: `${section}-${paper}-${i}`,
        text,
      }))
      .filter((item) => !remembered[item.id]);

    setCards(filtered.reverse());
  }, [section, paper, remembered, syllabus]);

  const rememberCard = async (id) => {
    const updated = { ...remembered, [id]: true };
    setRemembered(updated);
    if (user) {
      await setDoc(doc(db, "users", user.uid, "syllabus_progress", "UPSC"), {
        rememberedKeys: updated,
        last_updated: new Date()
      });
    }
  };

  const handleSwipe = (dir, id) => {
    if (dir === "right") {
      rememberCard(id);
    }
  };

  return (
    <div className="flashcard-wrapper">
      <div className="controls">
        <select value={section} onChange={(e) => {
          const sec = e.target.value;
          setSection(sec);
          const first = Object.keys(syllabus[sec])[0];
          setPaper(first);
        }}>
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

      <div className="card-stack">
        {cards.length === 0 && (
          <div className="no-more-cards">🎉 All remembered!</div>
        )}

        {cards.slice().reverse().map((card, i) => (
          <TinderCard
            key={card.id}
            onSwipe={(dir) => handleSwipe(dir, card.id)}
            preventSwipe={["up", "down"]}
          >
            <div className="card-content" style={{ "--i": i }}>
              <p>{card.text}</p>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default FlashcardTrainer;

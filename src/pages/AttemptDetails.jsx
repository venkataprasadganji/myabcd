// pages/AttemptDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { Card, Spinner } from "react-bootstrap";

const AttemptDetails = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const ref = doc(db, "users", user.uid, "attempts", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setData(snap.data());
    };
    fetch();
  }, [id, user]);

  if (!data) return <Spinner className="m-5" />;

  return (
    <div className="container py-4">
      <h4>📋 Attempt Review: {data.topic}</h4>
      <p><strong>Score:</strong> {data.score}/{data.total}</p>

      {data.questions.map((q, i) => (
        <Card key={i} className="my-3 p-3">
          <h6>Q{i + 1}. {q.question}</h6>
          {q.options.map((opt, idx) => (
            <div key={idx}>
              <span
                style={{
                  color:
                    q.selected === idx && !q.isCorrect
                      ? "red"
                      : idx === "ABCD".indexOf(q.correct)
                      ? "green"
                      : "black",
                }}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </span>
            </div>
          ))}
          <p><strong>Explanation:</strong> {q.explanation}</p>
        </Card>
      ))}
    </div>
  );
};

export default AttemptDetails;

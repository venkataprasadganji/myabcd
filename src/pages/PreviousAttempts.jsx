import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Card, Spinner } from "react-bootstrap";

const PreviousAttempts = () => {
  const [user] = useAuthState(auth);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!user) return;
      const q = query(collection(db, "users", user.uid, "attempts"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAttempts(data);
      setLoading(false);
    };

    fetchAttempts();
  }, [user]);

  if (loading) return <Spinner animation="border" className="m-4" />;

  return (
    <div className="container py-4">
      <h4>📊 Your Previous Attempts</h4>
      {attempts.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        attempts.map((attempt, i) => (
          <Card key={i} className="my-3 p-3">
            <h5>{attempt.topic} ({attempt.difficulty})</h5>
            <p>Score: {attempt.score} / {attempt.total}</p>
            <small>{attempt.timestamp?.toDate().toLocaleString()}</small>
          </Card>
        ))
      )}
    </div>
  );
};

export default PreviousAttempts;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ScoreChart = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState({ labels: [], scores: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const q = query(collection(db, "users", user.uid, "attempts"), orderBy("timestamp"));
      const snapshot = await getDocs(q);

      const labels = [];
      const scores = [];

      snapshot.docs.forEach(doc => {
        const d = doc.data();
        labels.push(new Date(d.timestamp?.toDate()).toLocaleDateString());
        scores.push((d.score / d.total) * 100);
      });

      setData({ labels, scores });
    };

    fetchData();
  }, [user]);

  return (
    <div className="container py-4">
      <h4>📈 Performance Trend</h4>
      <Line
        data={{
          labels: data.labels,
          datasets: [{
            label: "Score (%)",
            data: data.scores,
            fill: false,
            borderColor: "blue",
            tension: 0.2,
          }]
        }}
        height={300}
      />
    </div>
  );
};

export default ScoreChart;

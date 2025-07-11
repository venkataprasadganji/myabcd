import React, { useState } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import QuestionEvaluator from "../components/QuestionEvaluator";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const QuestionGenerator = () => {
  const [user] = useAuthState(auth);
  const [topic, setTopic] = useState("Indian Constitution");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuestions = async () => {
    setLoading(true);
    setQuestions([]);
    setError("");

    const prompt = `
Generate 3 multiple-choice questions for the topic: ${topic}, difficulty: ${difficulty}.
Each should include:
- A question
- 4 options (A-D)
- The correct answer
- An explanation for why the answer is correct

Format:
Q1. <question>
A. <option>
B. <option>
C. <option>
D. <option>
Answer: <A/B/C/D>
Explanation: <explanation>
`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const text = data.choices[0].message.content;

      const parsed = parseQuestions(text);
      setQuestions(parsed);
    } catch (err) {
      setError("Failed to generate questions. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const parseQuestions = (text) => {
    const blocks = text.trim().split(/Q\d+\./).slice(1);
    return blocks.map((block) => {
      const lines = block.trim().split("\n").filter(Boolean);
      const question = lines[0].trim();
      const options = lines.slice(1, 5).map(line => line.slice(3).trim()); // remove "A. "
      const answerLine = lines.find(l => l.startsWith("Answer:"));
      const explanationLine = lines.find(l => l.startsWith("Explanation:"));
      return {
        question,
        options,
        correct: answerLine?.split("Answer:")[1]?.trim() || "A",
        explanation: explanationLine?.split("Explanation:")[1]?.trim() || "",
      };
    });
  };

  const handleEvaluationFinished = async (results) => {
    if (!user) return;

    const score = results.filter(r => r.isCorrect).length;
    const total = results.length;

    await addDoc(collection(db, "users", user.uid, "attempts"), {
      topic,
      difficulty,
      score,
      total,
      timestamp: serverTimestamp(),
      questions: results.map(r => ({
        question: r.question,
        options: r.options,
        selected: r.selected,
        correct: r.correct,
        explanation: r.explanation,
        isCorrect: r.isCorrect,
      })),
    });
  };

  return (
    <div className="container py-4">
      <h4>🎯 Generate Personalized Questions</h4>

      <div className="mb-3">
        <label>Topic:</label>
        <input
          className="form-control"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
        />
      </div>

      <div className="mb-3">
        <label>Difficulty:</label>
        <select
          className="form-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <Button onClick={generateQuestions} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Generate Questions"}
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {questions.length > 0 && (
        <div className="mt-4">
          <QuestionEvaluator questions={questions} onFinish={handleEvaluationFinished} />
        </div>
      )}
    </div>
  );
};

export default QuestionGenerator;

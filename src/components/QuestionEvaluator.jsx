import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";

const QuestionEvaluator = ({ questions, onFinish }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [evaluated, setEvaluated] = useState(false);
  const [results, setResults] = useState([]);

  const handleOptionSelect = (qid, option) => {
    setSelectedAnswers({ ...selectedAnswers, [qid]: option });
  };

  const evaluate = () => {
    const evaluatedResults = questions.map((q, idx) => {
      const selected = selectedAnswers[idx];
      return {
        ...q,
        selected,
        isCorrect: selected === q.correct,
      };
    });
    setResults(evaluatedResults);
    setEvaluated(true);
    onFinish && onFinish(evaluatedResults); // to save in Firestore
  };

  return (
    <div>
      {questions.map((q, idx) => (
        <Card key={idx} className="mb-3 p-3">
          <strong>Q{idx + 1}. {q.question}</strong>
          <div className="mt-2">
            {q.options.map((opt, i) => {
              const label = String.fromCharCode(65 + i);
              const isSelected = selectedAnswers[idx] === label;
              const isCorrect = q.correct === label;

              return (
                <div key={label}>
                  <label style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={label}
                      onChange={() => handleOptionSelect(idx, label)}
                      disabled={evaluated}
                      checked={isSelected}
                    />
                    {" "}
                    {label}. {opt}
                  </label>
                </div>
              );
            })}
          </div>

          {evaluated && (
            <Alert variant={results[idx].isCorrect ? "success" : "danger"} className="mt-2">
              {results[idx].isCorrect ? "✅ Correct" : `❌ Wrong (Correct: ${q.correct})`}
              <div><strong>Explanation:</strong> {q.explanation}</div>
            </Alert>
          )}
        </Card>
      ))}

      {!evaluated && (
        <Button onClick={evaluate} className="mt-3">Submit Answers</Button>
      )}
    </div>
  );
};

export default QuestionEvaluator;

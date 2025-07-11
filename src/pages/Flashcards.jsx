import React, { useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";

const Flashcards = () => {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const prompt = `Generate 5 flashcards for the topic: ${topic}. Each flashcard should have a title and a short explanation.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const text = await res.json();
    const content = text.choices[0].message.content;

    const parsed = content.split("\n\n").map(f => {
      const [title, explanation] = f.split("\n").map(l => l.replace(/^[^:]*: /, ""));
      return { title, explanation };
    });

    setCards(parsed);
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h4>🧠 Generate Flashcards</h4>
      <input
        className="form-control mb-2"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic (e.g. Fundamental Rights)"
      />
      <Button onClick={generate} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Generate Flashcards"}
      </Button>

      {cards.length > 0 && (
        <div className="mt-4">
          {cards.map((c, i) => (
            <Card key={i} className="mb-3 p-3">
              <h5>{c.title}</h5>
              <p>{c.explanation}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flashcards;

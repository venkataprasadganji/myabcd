export const generateQuestionsFromOpenAI = async (course, topic, difficulty) => {
 const prompt = `
Generate 3 multiple-choice questions for the topic: ${topic}.
Each should include:
- A question
- 4 options (A-D)
- The correct answer
- An explanation for why it is correct

Format:
Q1. <question>
A. <option>
B. <option>
C. <option>
D. <option>
Answer: <A/B/C/D>
Explanation: <explanation>
`;


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 700,
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message?.content;
};

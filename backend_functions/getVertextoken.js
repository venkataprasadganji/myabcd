// vertexProxy.js
import express from "express";
import cors from "cors";
import { GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";

const app = express();

// 1) Enable CORS for your React origin (adjust port/origin as needed)
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const PROJECT_ID = "myabcd-465103";
const MODEL = "text-bison@001";
const LOCATION = "us-central1";

const VERTEX_URL = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}` +
  `/locations/${LOCATION}/publishers/google/models/gemini-2.0-flash-001:predict`;

app.post("/api/vertex-generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body" });
  }

  try {
    // 1. Acquire OAuth2 token using service account JSON (vertex-token.json)
    const auth = new GoogleAuth({
      keyFilename: "vertex-token.json",
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();

    // 2. Call Vertex AI predict endpoint
    const vertexRes = await fetch(VERTEX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40,
        },
      }),
    });

    if (!vertexRes.ok) {
      const errText = await vertexRes.text();
      return res.status(vertexRes.status).json({ error: errText });
    }

    const json = await vertexRes.json();
    return res.json(json);

  } catch (err) {
    console.error("Vertex proxy error:", err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Vertex proxy listening on http://localhost:${PORT}`)
);

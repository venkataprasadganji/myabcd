// vertexProxy.js
import express from "express";
import { GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PROJECT_ID = "myabcd-465103";
const MODEL = "text-bison@001";

app.post("/api/vertex-generate", async (req, res) => {
  const { subject, source, prompt } = req.body;
  try {
    // 1. Get OAuth2 access token from service account
    const auth = new GoogleAuth({
      keyFilename: "vertex-token.json",
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
    const client = await auth.getClient();
    const { token } = await client.getAccessToken();

    // 2. Call Vertex AI
    const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL}:predict`;
    const vertexResp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { temperature: 0.7, maxOutputTokens: 2048, topP: 0.8, topK: 40 },
      }),
    });

    if (!vertexResp.ok) {
      const text = await vertexResp.text();
      return res.status(vertexResp.status).send(text);
    }
    const json = await vertexResp.json();
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

app.listen(8080, () => console.log("Vertex proxy listening on http://localhost:8080"));

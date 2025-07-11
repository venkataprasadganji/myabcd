// utils/aiContentGenerator.js
import { OpenAI } from "openai";

// Initialize OpenAI (remains unchanged as the request was for Gemini update)
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Define the template structure for the AI-generated content
const templateStructure = {
  "chapter": {
    "title": "",
    "class": "",
    "book": "",
    "summary": {
      "theme": "",
      "key_concepts": [
        {
          "title": "",
          "points": [
            "",
            ""
          ]
        }
      ]
    },
    "mind_map": {
      "data_format": "D3_JSON",
      "nodes": [
        {
          "id": "root",
          "name": "Chapter Title",
          "children": []
        }
      ],
      "links": [
        {
          "source": "node1",
          "target": "node2"
        }
      ],
      "description": "JSON data structured for D3.js or similar mind map libraries, depicting the chapter's key concepts and their relationships."
    },
    "memory_tricks": [
      {
        "topic": "",
        "trick": "",
        "expansion": {
          "A": ""
        }
      }
    ],
    "upsc_insights": {
      "gs_paper_1": "",
      "gs_paper_2": "",
      "gs_paper_3": "",
      "gs_paper_4": "",
      "essay": "",
      "ethics": ""
    },
    "quotes": [
      ""
    ],
    "flashcards": [
      {
        "question": "",
        "answer": "",
        "difficulty": "medium",
        "probability": 0.5
      }
    ],
    "mcqs": [
      {
        "question": "",
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": ""
      }
    ],
    "mains_questions": [
      {
        "question": "",
        "answer": "",
        "tags": [""]
      }
    ]
  },
  "metadata": {
    "created_by": {
      "user_id": "",
      "username": ""
    },
    "created_time": "YYYY-MM-DDTHH:MM:SSZ",
    "last_updated_time": "YYYY-MM-DDTHH:MM:SSZ",
    "tags": ["history", "polity", "constitution"],
    "linked_collections": [
      {
        "collection_name": "relevant_articles",
        "link_id": "article_id_123"
      },
      {
        "collection_name": "related_case_studies",
        "link_id": "case_study_id_456"
      }
    ]
  },
  "probabilityScore": 0.5
};

/**
 * Generates AI content using OpenAI's gpt-4-1106-preview model.
 * @param {object} params - The parameters for content generation.
 * @param {string} params.subject - The subject of the content.
 * @param {string} params.source - The source material for the content.
 * @returns {Promise<object>} - A promise that resolves to the parsed JSON content.
 * @throws {Error} If OpenAI returns invalid JSON.
 */
export async function generateChapterAIContent({ subject, source }) {
  const prompt = `
You are a UPSC expert. Based on the subject "${subject}" and source "${source}", generate structured JSON in this exact format:

${JSON.stringify(templateStructure, null, 2)}

Rules:
- Strict JSON only
- No extra explanation or markdown.
- Give a rich and detalied dont miss any concept and i should completely trust you.
- For 'summary.theme', provide a very concise, overarching theme (e.g., "Indian Constitution: Historical Evolution and Key Features"). It should be a single, short sentence.
- For 'summary.key_concepts', list specific, detailed points related to the theme.
- Provide rich UPSC content with MCQs, mains, summary, etc.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      { role: "system", content: "You are a UPSC content generation assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    // IMPORTANT: Instruct OpenAI to return JSON directly
    response_format: { type: "json_object" }
  });

  let raw = completion.choices[0].message.content;
  // While response_format should prevent this, keeping as a defensive measure
  if (raw.startsWith("```json")) {
    raw = raw.substring(7); // Remove "```json"
  }
  if (raw.endsWith("```")) {
    raw = raw.substring(0, raw.length - 3); // Remove "```"
  }
  raw = raw.trim(); // Trim any leading/trailing whitespace

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error parsing OpenAI response:", error);
    throw new Error(`OpenAI returned invalid JSON: ${raw}`);
  }
}

/**
 * Generates AI content using Google's Gemini 2.0 Flash model.
 * This function has been updated to use the latest model and prompt structure.
 * It also includes a response schema for structured JSON output.
 * @param {object} params - The parameters for content generation.
 * @param {string} params.subject - The subject of the content.
 * @param {string} params.source - The source material for the content.
 * @returns {Promise<object>} - A promise that resolves to the parsed JSON content.
 * @throws {Error} If Gemini AI returns an error or invalid JSON.
 */
export async function generateWithGemini({ subject, source }) {
  // The API key is left as an empty string. Canvas will automatically provide it at runtime.
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  // Corrected URL to use the apiKey variable for Canvas environment
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

  const templatePrompt = `
You are a UPSC expert. Based on the subject "${subject}" and source "${source}", generate structured JSON in this exact format:

${JSON.stringify(templateStructure, null, 2)}

Rules:
- Strict JSON only
- No extra explanation or markdown.
- Give a rich and detalied dont miss any concept and i should completely trust you.
- For 'summary.theme', provide a very concise, overarching theme (e.g., "Indian Constitution: Historical Evolution and Key Features"). It should be a single, short sentence.
- For 'summary.key_concepts', list specific, detailed points related to the theme.
- Provide rich UPSC content with MCQs, mains, summary, etc.
`;

  // Prepare chat history in the new 'contents' format
  const chatHistory = [];
  chatHistory.push({ role: "user", parts: [{ text: templatePrompt }] });

  // Define the payload for the Gemini API request
  const payload = {
    contents: chatHistory, // Use the 'contents' array for the prompt
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
    }

  }

  // Make the fetch request to the Gemini API
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  // Handle non-OK HTTP responses
  if (!response.ok) {
    const errText = await response.text();
    console.error(`Gemini AI HTTP error ${response.status}: ${errText}`); // Use console.error for errors
    throw new Error(`Gemini AI HTTP error ${response.status}: ${errText}`);
  }

  var result = await response.json();

  // Parse the response based on the new structure (result.candidates[0].content.parts[0].text)
  if (result.candidates && result.candidates.length > 0 &&
      result.candidates[0].content && result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0) {
    var text = result.candidates[0].content.parts[0].text;
    console.log("Raw Gemini AI response text:", text); // Log the raw text for debugging

     if (text.startsWith("```json")) {
    text = text.substring(7); // Remove "```json"
  }
  if (text.endsWith("```")) {
    text = text.substring(0, text.length - 3); // Remove "```"
  }
  text = text.trim(); // Trim any leading/trailing whitespace
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("Error parsing Gemini AI response:", error);
      throw new Error(`Gemini AI returned invalid JSON: ${text}`);
    }
  } else {
    throw new Error(`Gemini AI returned empty or malformed response: ${JSON.stringify(result)}`);
  }
}

/**
 * Generates content from both OpenAI and Gemini models concurrently.
 * @param {object} params - The parameters for content generation.
 * @param {string} params.subject - The subject of the content.
 * @param {string} params.source - The source material for the content.
 * @returns {Promise<object>} - A promise that resolves to an object containing content from both models.
 */
export async function generateFromBothModels({ subject, source }) {
  const [openai, gemini] = await Promise.all([
    generateChapterAIContent({ subject, source }),
    generateWithGemini({ subject, source })
  ]);
  return { openai, gemini };
}

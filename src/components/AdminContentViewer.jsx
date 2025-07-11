// components/AdminContentManager.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
  Alert,
  Spinner,
  Modal
} from "react-bootstrap";
import { generateFromBothModels } from "../utils/aiContentGenerator";

const AdminContentManager = () => {
  const [subjectId, setSubjectId] = useState("polity");
  const [sourceId, setSourceId] = useState("class6");
  const [openaiJson, setOpenaiJson] = useState(null);
  const [vertexJson, setVertexJson] = useState(null);
  const [selectedJson, setSelectedJson] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await doc(db, "admin_roles", user.uid);
        setIsAdmin(docSnap.exists());
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { openai, vertex } = await generateFromBothModels({ subject: subjectId, source: sourceId });
      setOpenaiJson(openai);
      setVertexJson(vertex);
    } catch (err) {
      alert("Error generating content: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedJson) return alert("Please select a content version to save.");
    const chapterDoc = {
      ...selectedJson,
      subjectId,
      sourceId,
      createdAt: serverTimestamp(),
      modifiedAt: serverTimestamp(),
    };
    await addDoc(collection(db, "chapters"), chapterDoc);
    alert("Saved successfully.");
  };

  if (!authChecked) return <Spinner animation="border" className="m-4" />;
  if (!isAdmin) return <Alert variant="danger">Access Denied</Alert>;

  return (
    <Card className="m-4 p-4">
      <h4>Admin: AI UPSC Chapter Generator</h4>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control value={subjectId} onChange={(e) => setSubjectId(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Source</Form.Label>
              <Form.Control value={sourceId} onChange={(e) => setSourceId(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <div className="mt-3">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate from OpenAI + VertexAI"}
          </Button>
        </div>
      </Form>

      {(openaiJson || vertexJson) && (
        <Row className="mt-4">
          <Col md={6}>
            <h5>🔷 OpenAI Output</h5>
            <pre className="p-2 bg-light" style={{ maxHeight: "400px", overflowY: "scroll" }}>
              {JSON.stringify(openaiJson, null, 2)}
            </pre>
            <Button variant="outline-primary" onClick={() => setSelectedJson(openaiJson)}>
              ✅ Use This
            </Button>
          </Col>

          <Col md={6}>
            <h5>🟡 Vertex AI Output</h5>
            <pre className="p-2 bg-light" style={{ maxHeight: "400px", overflowY: "scroll" }}>
              {JSON.stringify(vertexJson, null, 2)}
            </pre>
            <Button variant="outline-warning" onClick={() => setSelectedJson(vertexJson)}>
              ✅ Use This
            </Button>
          </Col>
        </Row>
      )}

      {selectedJson && (
        <div className="mt-4">
          <h5>✅ Selected Version Preview</h5>
          <pre className="bg-dark text-white p-3 rounded">
            {JSON.stringify(selectedJson, null, 2)}
          </pre>
          <Button variant="success" onClick={handleSubmit}>
            🚀 Save to Firestore
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AdminContentManager;

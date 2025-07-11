import React, { useState } from "react";
import { signupWithEmail } from "../controllers/authController";
import { Form, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SignupForm = ({ switchToLogin }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await signupWithEmail(email, password);
      setMessage(t("messages.verification-sent") || "Verification email sent.");
    } catch (err) {
      setError(t(err.message) || t("errors.default"));
    }
  };

  return (
    <>
      <h3 className="text-center mb-3" style={{
        color: "#004080",
        fontWeight: "bold",
       // borderBottom: "2px solid #004080",
        display: "inline-block",
        paddingBottom: "4px",
      }}>{t("signup.title") || "Sign Up"}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>{t("signup.email") || "Email"}</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("signup.email-placeholder") || "Enter your email"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t("signup.password") || "Password"}</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("signup.password-placeholder") || "Create a password"}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100 mb-2">
          {t("signup.button") || "Sign Up"}
        </Button>
      </Form>

      <p className="text-center">
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={switchToLogin}
        >
          ⬅ {t("signup.back") || "Back to Login"}
        </span>
      </p>
    </>
  );
};

export default SignupForm;

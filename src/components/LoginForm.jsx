import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { loginWithEmail, loginWithGoogle } from "../controllers/authController";
import { getFriendlyError } from "../utils/getFriendlyError";

const LoginForm = ({ switchToSignup }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      const friendly = getFriendlyError(err.code, t);
      setError(friendly);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      const friendly = getFriendlyError(err.code, t);
      setError(friendly);
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
      }}>{t("login.title")}</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>{t("login.email")}</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("login.email-placeholder") || "Enter your email"}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t("login.password")}</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("login.password-placeholder") || "Enter your password"}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100 mb-2">
          {t("login.submit")}
        </Button>
      </Form>

      <Button
        onClick={handleGoogleLogin}
        variant="outline-danger"
        className="w-100 rounded-pill mt-2"
      >
        {t("login.google") || "Continue with Google"}
      </Button>

      <p className="text-center mt-3">
        {t("login.noAccount")}{" "}
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={switchToSignup}
        >
          {t("login.signup")}
        </span>
      </p>
    </>
  );
};

export default LoginForm;

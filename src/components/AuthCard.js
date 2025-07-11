// File: src/components/AuthCard.js
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Container, Row, Col, Card } from "react-bootstrap";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card
            className="p-4 shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(6px)",
              borderRadius: "1rem",
            }}
          >
            {isLogin ? (
              <LoginForm switchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm switchToLogin={() => setIsLogin(true)} />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthCard;

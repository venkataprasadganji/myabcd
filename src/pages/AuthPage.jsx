import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();
 //   const location = useLocation();
//const screen = location.state?.screen || "login"; // default to login
//const [isLogin, setIsLogin] = useState(screen === "login");

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
     background: "#054057",
background: "linear-gradient(90deg,rgba(5, 64, 87, 1) 0%, rgba(122, 10, 163, 1) 66%, rgba(99, 38, 7, 1) 100%)",
 backgroundSize: "cover",
      }}
    >
     <Card
  className="p-4 shadow-lg"
  style={{
    backgroundColor: "rgba(236, 233, 233, 0.45)",
    borderRadius: "1rem",
    width:"400px"
  }}
>
  <div className="text-center mb-4">
   
    <div
      style={{
        width: "30px",
        height: "30px",
        margin: "0 auto 5px",
        backgroundColor: "#eee",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: "#999",
      }}
    >
      🔰
    </div>

  
   
  </div>

        {isLogin ? (
          <LoginForm switchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm switchToLogin={() => setIsLogin(true)} />
        )}
      </Card>
    </Container>
  );
};

export default AuthPage;

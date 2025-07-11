import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Container, Navbar, Nav, Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QuestionGenerator from "../components/QuestionGenerator";
import CurrentAffairsList from "../pages/CurrentAffairsList";
import { Spinner } from "react-bootstrap";
import SyllabusTabs from "../components/SyllabusTabs";
import PreviousPapersArchive from "../components/PreviousPapersArchive";
import ContentExplorer from "../components/ContentExplorer";
import SubHeader from "../components/SubHeader";
import AdminContentManager from "../components/AdminContentManager";
import MainContentCards from "../components/MainContentCards";

import {
  FaMoon,
  FaSun,
  FaBook,
  FaFileAlt,
  FaBrain,
  FaChartBar,
  FaCogs,
  FaUserCircle,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";

import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("UPSC");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [latestNews, setLatestNews] = useState(
    "📢 UPSC 2025 Notification expected by August 15th!"
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dismissNews = () => setLatestNews(null);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const roleDoc = await getDoc(doc(db, "admin_roles", currentUser.uid));
          if (roleDoc.exists()) {
            const roleData = roleDoc.data();
            setIsAdmin(roleData.role === "admin");
          }
        } catch (error) {
          console.error("Error checking admin role:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const componentMap = {
    "Current Affairs": <CurrentAffairsList />,
    "Mock Exams": <QuestionGenerator />,
    "Syllabus": <SyllabusTabs />,
    "Previous Papers": <PreviousPapersArchive />,
    "UPSC Content": <MainContentCards />,
    RE: <ContentExplorer />,
    "Admin Panel": <AdminContentManager />,
  };

  const getFeatures = () => {
    const base = [
      { title: "Syllabus", icon: <FaBook />, key: "Syllabus", description: "Full syllabus" },
      { title: "Previous Papers", icon: <FaFileAlt />, key: "Previous Papers", description: "Past UPSC papers" },
      { title: "Current Affairs", icon: <FaBrain />, key: "Current Affairs", description: "Daily/Monthly news" },
      { title: "UPSC Content", icon: <FaBook />, key: "UPSC Content", description: "NCERT's, Standard Books etc.." },
      { title: "Mock Exams", icon: <FaCheckCircle />, key: "Mock Exams", description: "Practice full exams" },
      { title: "My Progress", icon: <FaChartBar />, key: "My Progress", description: "Track scores" },
      { title: "Reports", icon: <FaClipboardList />, key: "Reports", description: "Performance reports" },
      { title: "MySpace", icon: <FaUserCircle />, key: "MySpace", description: "Notes and bookmarks" },
      { title: "Settings", icon: <FaCogs />, key: "Settings", description: "App preferences" },
      { title: "RE", icon: <FaCogs />, key: "RE", description: "Resource Explorer" },
    ];
    if (isAdmin) {
      base.push({
        title: "Admin Panel",
        icon: <FaCogs />,
        key: "Admin Panel",
        description: "Manage UPSC content",
      });
    }
    return base;
  };

  const selectedFeature = getFeatures().find((f) => f.key === selectedMenu);

  const renderContent = () => {
    if (selectedMenu !== "") {
      return (
        <div className="fade-in">
          <SubHeader
            title={selectedMenu}
            description={selectedFeature?.description}
            icon={selectedFeature?.icon}
            onBack={() => {
              setIsLoading(true);
              setTimeout(() => {
                setSelectedMenu("");
                setIsLoading(false);
              }, 300);
            }}
          />

          {isLoading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3">Loading...</p>
            </div>
          ) : (
            <div className="mt-2">
              {componentMap[selectedMenu] ? (
                componentMap[selectedMenu]
              ) : (
                <p>{selectedFeature?.description}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        {latestNews && (
          <div className="news-banner mb-4 p-3 rounded shadow-sm d-flex align-items-center justify-content-between">
            <span>{latestNews}</span>
            <button className="btn btn-sm btn-outline-dark" onClick={dismissNews}>
              Dismiss
            </button>
          </div>
        )}
        <div className="card-grid fade-in">
          {getFeatures().map((item) => (
            <div
              key={item.key}
              className="dashboard-card"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setSelectedMenu(item.key);
                  setIsLoading(false);
                }, 300);
              }}
            >
              <div className="icon-wrap mb-2">{item.icon}</div>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <Container fluid className="dashboard-wrapper p-0">
      <Navbar expand="lg" className="px-4 py-2 justify-content-between dashboard-navbar">
        <div className="d-flex align-items-center gap-3">
          <h5 className="mb-0 text-white">{selectedCourse}</h5>
          <Form.Select
            size="sm"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-select"
          >
            <option value="UPSC">UPSC</option>
            <option value="SSC">SSC</option>
            <option value="GATE">GATE</option>
            <option value="CAT">CAT</option>
          </Form.Select>
        </div>
        <div className="dark-mode-switch d-flex align-items-center">
          <FaSun size={18} className="me-2" />
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span className="slider round"></span>
          </label>
          <FaMoon size={18} className="ms-2" />
        </div>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" size="sm">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  width="30"
                  height="30"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                "👤 Profile"
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item disabled>{user?.email}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
      <div className="dashboard-layout">
        <main className="dashboard-scrollable">{renderContent()}</main>
        <footer className="dashboard-quote">
          <div className="quote-box text-center py-2">
            <blockquote className="mb-0 fst-italic">
              “Discipline is the bridge between goals and accomplishment.”
            </blockquote>
          </div>
        </footer>
      </div>
    </Container>
  );
};

export default Dashboard;

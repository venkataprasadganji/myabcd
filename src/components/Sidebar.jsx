import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBookOpen,
  FaFileAlt,
  FaBook,
  FaCog,
  FaBrain,
  FaHistory,
  FaChartLine,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar, selectedMenu, setSelectedMenu, selectedCourse }) => {
  const navigate = useNavigate();

  const dashboardMenuItems = [
    { name: "Topics", icon: <FaBookOpen /> },
    { name: "Previous Papers", icon: <FaFileAlt /> },
    { name: "Books", icon: <FaBook /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Current Affairs", icon: <FaCog /> },
  ];

  const routedMenuItems = [
    { name: "Flashcards", icon: <FaBrain />, path: "/flashcards" },
    { name: "Previous Attempts", icon: <FaHistory />, path: "/previous-attempts" },
    { name: "Score Trend", icon: <FaChartLine />, path: "/score-chart" },
  ];

  return (
    <div
      style={{
        width: isOpen ? "240px" : "70px",
        backgroundColor: "#004080",
        color: "white",
        padding: "1rem",
        transition: "width 0.3s",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: "10px",
          right: "-15px",
          backgroundColor: "#fff",
          color: "#004080",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          border: "1px solid #ccc",
          zIndex: 10,
        }}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </div>

      {/* App Title */}
      {isOpen && <h5 className="mb-4 text-center">📚 myABCD</h5>}

      {/* Selected Course Info */}
      {isOpen && selectedCourse && (
        <div className="text-center mb-3" style={{ fontSize: "0.9rem", color: "#ddd" }}>
          🎯 Course: <strong>{selectedCourse}</strong>
        </div>
      )}

      {/* Dashboard Menu Items */}
      <ul className="list-unstyled mt-4">
        {dashboardMenuItems.map((item) => (
          <li key={item.name} className="mb-3">
            <Button
              variant="link"
              className={`text-start text-white p-0 d-flex align-items-center gap-2 ${
                selectedMenu === item.name ? "fw-bold text-warning" : ""
              }`}
              style={{ width: "100%", fontSize: "1rem" }}
              onClick={() => setSelectedMenu(item.name)}
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Button>
          </li>
        ))}

        {/* Routed Items */}
        {routedMenuItems.map((item) => (
          <li key={item.name} className="mb-3">
            <Button
              variant="link"
              className="text-start text-white p-0 d-flex align-items-center gap-2"
              style={{ width: "100%", fontSize: "1rem" }}
              onClick={() => navigate(item.path)}
            >
              <span>{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Navbar, Container, Dropdown, Form } from "react-bootstrap";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Topbar = ({ selectedCourse, setSelectedCourse }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth");
  };

  return (
    <Navbar bg="light" className="shadow-sm" style={{ height: "60px" }}>
      <Container fluid>
        <Form.Select
          style={{ width: "200px" }}
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="UPSC">UPSC</option>
          <option value="SSC">SSC</option>
          <option value="GATE">GATE</option>
          <option value="CAT">CAT</option>
        </Form.Select>

        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" size="sm">
            👤 Profile
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item onClick={() => alert("Profile config coming soon!")}>
              Configure Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Topbar;

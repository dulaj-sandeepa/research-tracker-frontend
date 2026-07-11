import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Login from './Login';
import Projects from './Projects';

function App() {
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  const handleLoginSuccess = (userRole: string) => {
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
  };

  return (
      <Router>
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/">🔬 Research Tracker Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="align-items-center">
                {role ? (
                    <>
                      <Nav.Link as={Link} to="/projects" className="me-3 text-light">Dashboard</Nav.Link>
                      <Button variant="outline-light" size="sm" onClick={handleLogout}>
                        Sign Out
                      </Button>
                    </>
                ) : (
                    <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Application Routing */}
        <Container>
          <Routes>
            {/* Default Route redirection */}
            <Route path="/" element={role ? <Navigate to="/projects" /> : <Navigate to="/login" />} />

            {/* Login Screen Route */}
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

            {/* Protected Projects Route */}
            <Route path="/projects" element={role ? <Projects /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;


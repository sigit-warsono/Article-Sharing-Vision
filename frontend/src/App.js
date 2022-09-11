import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allpost from "./components/Allpost";
import Addpost from "./components/Addpost";
import Editpost from "./components/Editpost";
import PreviewPublish from "./components/PreviewPublish";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#article">Article</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Post" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">All Posts</NavDropdown.Item>
                <NavDropdown.Item href="/addpost">Add new</NavDropdown.Item>
                <NavDropdown.Item href="/preview_publish">Preview</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <Routes>
          <Route path="/" element={<Allpost />} />
          <Route path="/allpost" element={<Allpost />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/editpost/:id" element={<Editpost />} />
          <Route path="/preview_publish" element={<PreviewPublish />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

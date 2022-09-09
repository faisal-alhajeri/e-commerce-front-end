import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function MyNavBar() {
  return (
    <>
      <Navbar sticky="top" bg='dark' variant="dark" className="my-nav">
        <Container fluid className="px-5 py-3">
          <Navbar.Brand>Hand Crafts</Navbar.Brand>
        </Container>

        <Nav className="p-3">
          <Nav.Link  as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
          <Button variant="outline-info" >
            asdsadadaswd
          </Button>
        </Nav>
      </Navbar>
    </>
  );
}

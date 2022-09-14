import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LogoutSpan from "../features/auth/components/LogoutSpan";
import { useAuth } from "../features/auth/context/AuthContext";
import MyLogo from "./MyLogo";

export function MyNavBar() {
  const { authinticated } = useAuth();

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" className="my-nav">
        <Container fluid className=" px-5 py-3">
          <Navbar.Brand><MyLogo className="logo-sm" />Hand Crafts</Navbar.Brand>
        </Container>

        <Nav className="p-3">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
          {!authinticated() ? (
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/login">
            <LogoutSpan />
          </Nav.Link>
          )}

          <Button variant="outline-info">asdsadadaswd</Button>
        </Nav>
      </Navbar>
    </>
  );
}

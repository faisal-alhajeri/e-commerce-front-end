import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutSpan from "../features/auth/components/LogoutSpan";
import { useAuth } from "../features/auth/context/AuthContext";
import MyButton from "./forms/MyButton";
import MyLogo from "./MyLogo";

export function MyNavBar() {
  const { authinticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        bg="dark"
        variant="dark"
        className="my-nav d-flex justify-content-between"
        collapseOnSelect
      >
        <Container fluid className=" px-5 py-3">
          <Navbar.Brand className="d-flex align-items-center">
            <MyLogo className="logo-sm" /> {isAdmin() ? <span>Admin</span> : ""}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="p-3 justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              <UnAuthenticatedNav />
              <AuthenticatedNav />
              <AdminNav />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

function UnAuthenticatedNav() {
  const { authinticated } = useAuth();

  return (
    <>
      {!authinticated() && (
        <>
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
        </>
      )}
    </>
  );
}

function AuthenticatedNav() {
  const { authinticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {authinticated() && !isAdmin() && (
        <>
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>

          <NavDropdown title="Account">
            <NavDropdown.Item as={NavLink} to="/orders">
              Orders
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/login">
              <LogoutSpan />
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}

      {authinticated() && !isAdmin() && (
        <span>
          <MyButton
            onClick={() => navigate("/cart")}
            className="rounded-circle"
            variant="outline-info"
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </MyButton>
        </span>
      )}
    </>
  );
}

function AdminNav() {
  const { authinticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {authinticated() && isAdmin() && (
        <>
          <Nav.Link as={NavLink} to="/admin">
            Home
          </Nav.Link>
          <NavDropdown title="Account">
            <NavDropdown.Item as={NavLink} to="/admin">
              Manage Products
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={NavLink} to="/login">
              <LogoutSpan />
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </>
  );
}

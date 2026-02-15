import React from "react";
import { Navbar, Nav } from "react-bootstrap";

interface Props {
  setView: (view: "home" | "cart") => void;
}

const Header: React.FC<Props> = ({ setView }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <span>Zen Grocery</span>
      </Navbar.Brand>

      <Nav>
        <Nav.Link onClick={() => setView("home")}>Home</Nav.Link>
        <Nav.Link onClick={() => setView("cart")}>Cart</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;

import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function SiteNav() {
  const location = useLocation();
  console.log(location);

  return (
    <Navbar expand="lg" data-bs-theme="dark" bg="dark">
      <Container>
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>
              Notifications
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/send">
            <Nav.Link>
              Send notification
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  )
}

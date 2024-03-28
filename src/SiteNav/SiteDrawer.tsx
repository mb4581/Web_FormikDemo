import { SiteDrawerProps } from "./Types.ts";
import { Nav, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function SiteDrawer(props: SiteDrawerProps) {
  return (
    <Offcanvas show={props.open} onHide={props.onClose}>
      <Offcanvas.Header>
        <Offcanvas.Title>Formik demo</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
      </Offcanvas.Body>
    </Offcanvas>
  )
}

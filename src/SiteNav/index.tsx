import { useLocation } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import { SiteDrawer } from "./SiteDrawer.tsx";
import React from "react";

export function SiteNav() {
  const location = useLocation();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpen(false);
  }, [location])

  return (
    <Navbar expand="lg" data-bs-theme="dark" bg="dark">
      <SiteDrawer open={open} onClose={() => setOpen(false)} />
      <div style={{margin: "0 16px"}}>
        <Button variant="outline-light" onClick={() => setOpen(true)}>
          Menu
        </Button>
      </div>
    </Navbar>
  )
}

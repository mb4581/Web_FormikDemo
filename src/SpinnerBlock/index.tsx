import {Spinner} from "react-bootstrap";

export function SpinnerBlock(): JSX.Element {
  return (
    <div style={{textAlign: "center", padding: "2em"}}>
      <Spinner />
    </div>
  )
}
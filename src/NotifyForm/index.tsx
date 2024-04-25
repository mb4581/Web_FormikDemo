import {Field, Form, Formik} from "formik";
import {NotifyFormData} from "./Types.ts";
import {Alert, Button, Container} from "react-bootstrap";
import {useAddNotificationMutation} from "../API.ts";

const INITIAL_VALUES: NotifyFormData = {
  title: "",
  message: "",
}

export default function NotifyForm() {
  const [addNotification, {
    isLoading,
    data: addedRow,
    error,
  }] = useAddNotificationMutation();

  return (
    <Container style={{paddingTop: 32}}>
      <Formik initialValues={{...INITIAL_VALUES}} onSubmit={addNotification}>
        {() => (
          <Form>
            <label className="form-label" htmlFor="field_title">Title:</label>
            <Field id="field_title" name="title" className="form-control"/>
            <br/>
            <label className="form-label" htmlFor="field_message">Message:</label>
            <Field id="field_message" name="message" className="form-control"/>
            <br/>
            <div>
              <Button type="submit" variant="primary" disabled={isLoading}>
                Send notification
              </Button>
            </div>
            <br/>
            <Alert variant={!error ? "success" : "danger"} style={{display: !addedRow ? "none" : ""}}>
              {(!error && addedRow) ? `Created, id=${addedRow.id}` : JSON.stringify(error)}
            </Alert>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

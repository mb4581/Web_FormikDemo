import { Field, Formik, Form, FormikHelpers } from "formik";
import { NotifyFormData } from "./Types.ts";
import React, { useCallback } from "react";
import { API_URL } from "../Config.ts";
import { Alert, Button, Container } from "react-bootstrap";

const INITIAL_VALUES: NotifyFormData = {
  title: "",
  message: "",
}

export function NotifyForm() {
  const [[isSuccess, result], setResult] = React.useState<[boolean, string]>([false, ""]);

  const onSubmit = useCallback(async (values: NotifyFormData, helpers: FormikHelpers<NotifyFormData>): Promise<void> => {
    const result = await fetch(`${API_URL}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if(result.status != 200) {
      setResult([false, "Send failed"]);
      return;
    }

    const body = await result.json()
    setResult([true, `Sent successfully, id ${body.id}`]);
    helpers.setSubmitting(false);
  }, []);

  return (
    <Container style={{paddingTop: 32}}>
      <Formik initialValues={{...INITIAL_VALUES}} onSubmit={onSubmit}>
        {(data) => (
          <Form>
            <label className="form-label" htmlFor="field_title">Title:</label>
            <Field id="field_title" name="title" className="form-control"/>
            <br/>
            <label className="form-label" htmlFor="field_message">Message:</label>
            <Field id="field_message" name="message" className="form-control"/>
            <br/>
            <div>
              <Button type="submit" variant="primary" disabled={data.isSubmitting}>
                Send notification
              </Button>
            </div>
            <br/>
            <Alert variant={isSuccess ? "success" : "danger"} style={{display: result == "" ? "none" : ""}}>
              {result}
            </Alert>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

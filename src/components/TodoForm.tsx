import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

export default function TodoForm({
  createNewTask,
}: {
  createNewTask: (priority: number, description: string) => void;
}): JSX.Element {
  const [priority, setPriority] = useState(1);
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!description || !priority) {
      setValidationError(true);
      return;
    }
    createNewTask(priority, description);
    setDescription("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs="auto">
            <Form.Label>
              <b>Priority</b>
            </Form.Label>
            <Form.Control
              type="number"
              className="mb-2 mr-sm-2"
              value={priority}
              onChange={(e) => {
                setValidationError(false);
                setPriority(parseInt(e.target.value));
              }}
              placeholder="1"
              style={{ width: "70px" }}
            />
          </Col>
          <Col>
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-1 mr-sm-1"
              value={description}
              onChange={(e) => {
                setValidationError(false);
                setDescription(e.target.value);
              }}
              placeholder="Something that needs to be done!"
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="primary mb-3"
              type="submit"
              style={{ marginTop: "32px" }}
            >
              Submit
            </Button>
          </Col>
        </Form.Row>
        {validationError ? (
          <div style={{ marginBottom: "15px", color: "red" }}>
            Please provide a valid priority and description.
          </div>
        ) : null}
      </Form>
    </>
  );
}

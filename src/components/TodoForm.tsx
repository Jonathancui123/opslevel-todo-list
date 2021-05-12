import React, { useState } from "react";
import { Button, Form, Col, Tooltip, OverlayTrigger } from "react-bootstrap";

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
    if (!description || !priority || !(priority > 0)) {
      setValidationError(true);
      return;
    }
    createNewTask(priority, description);
    setDescription("");
    setPriority((oldPriority) => oldPriority + 1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs="auto">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>
                  Try a large number to see ellipses.
                </Tooltip>
              }
            >
              <Form.Label>
                <b>Priority</b>
              </Form.Label>
            </OverlayTrigger>

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
            Please provide a priority greater than zero and non-empty description.
          </div>
        ) : null}
      </Form>
    </>
  );
}

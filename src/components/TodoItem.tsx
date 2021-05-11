import { TaskId, Task } from "../types";
import { Button, Card } from "react-bootstrap";

export default function TodoItem({
  task,
  taskId,
  priority,
  completeTask,
  deleteTask,
}: {
  task: Task;
  taskId: TaskId;
  priority: number;
  completeTask: (priority: number, taskId: TaskId) => void;
  deleteTask: (priority: number, taskId: TaskId) => void;
}) {
  return (
    <Card>
      <Card.Body>
        <div className="todoItem">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginRight: "15px" }}>
              <span>
                <b>{priority}</b>
              </span>
            </div>
            <div>
              <span
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "",
                }}
              >
                {task.description}
              </span>
            </div>
          </div>
          <div>
            <Button
              variant="outline-success"
              onClick={() => completeTask(priority, taskId)}
            >
              Done
            </Button>{" "}
            <Button
              variant="outline-danger"
              onClick={() => deleteTask(priority, taskId)}
            >
              ✕
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

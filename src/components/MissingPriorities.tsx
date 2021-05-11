import React from "react";
import { Alert } from "react-bootstrap";

export default function MissingPriorities({
  priorities,
}: {
  priorities: number[];
}) {
  const sortedPriorities = priorities.sort();
  const missingPriorities: string[] = [];
  // Check for spaces between the priorities
  let prevPriority = 0;
  for (const priority of sortedPriorities) {
    if (priority - prevPriority > 5) {
      // Several missing priorities. Use an ellipses
      const currentMissed = `${prevPriority + 1}...${priority - 1}`;
      missingPriorities.push(currentMissed);
    } else if (priority - prevPriority > 1) {
      // 3 or fewer missing priorities
      const currentMissedArray = [];
      for (var i = prevPriority + 1; i < priority; i++) {
        currentMissedArray.push(i);
      }
      const currentMissed = currentMissedArray.join(", ");
      missingPriorities.push(currentMissed);
    }
    prevPriority = priority;
  }
  const missingPrioritiesString = missingPriorities.join(", ");

  let displayMissing = false;
  if (missingPrioritiesString.length > 0) {
    displayMissing = true;
  }
  return (
    <Alert
      variant="info"
      style={{
        display: displayMissing ? "block" : "none",
        marginBottom: "20px",
      }}
    >
      <b>Missing Priorities: </b>
      <span>{missingPrioritiesString}</span>
    </Alert>
  );
}

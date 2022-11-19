// i've created a new component here to demonstrate use of props in typescript
// this component determines what will be returned in our todolist.
import React from "react";
import { ITask } from "../interfaces";
import "./ToDoTask.css";

interface props {
  task: ITask;
  //   the completeTask function which we bring in as props won't return anything hence 'void' and as per our App.tsx file, the completeTask function requires "TaskToDelete: string"
  completeTask(TaskToDelete: string): void;
}

const toDoTask = ({ task, completeTask }: props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>

        <span>
          <>{task.deadline}</>
        </span>
      </div>
      {/* as the below button is the button that will delete all unwanted tasks, we'll need to get the function from App.tsx/have the function passed here as a prop.  */}
      <button
        onClick={() => {
          // below we call the completeTask function and then pass in the taskname
          completeTask(task.taskName);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default toDoTask;

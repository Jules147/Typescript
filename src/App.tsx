import React, { FC, useState, ChangeEvent } from "react";
import { ITask } from "./interfaces";
import "./App.css";
import ToDoTask from "./Components/ToDoTask";

const App: FC = () => {
  // our first state will keep track of the user's todo entry
  const [task, setTask] = useState<string>("");
  // our second state will keep track of the user's deadline
  const [deadline, setDeadline] = useState<number>(Number);
  // our third state will keep track of the todolist itself which is an object including the task itself and the deadline - we've defined our own interface here (which is an ITask array) '<ITask[]>' and imported the interface from our interfaces.ts file
  // note if useState below was simply an array of strings, we'd definie it as 'useState<string[]>([])'
  const [todoList, setToDoList] = useState<ITask[]>([]);

  // the event itself can be defined. - as a 'ChangeEvent' that updates HTML on the page (<HTMLInputElement>). Our function won't return anything so we'll set this to 'void'
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // we have one function here that updates both the 'task' input and 'deadline' input. So if the event doesn't relate to 'task', it must relate to 'deadline'. I've seperated as both states hold different types (a number or string) and so couldn't refer to them both at once as '({[e.target.name]:e.target.value})'
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      // we've set the state of our deadline as a number, so must convert string to number below - 'Number'
      setDeadline(Number(event.target.value));
    }
  };

  // we'll create a function that will add the next thing to our task. Note that updateTodo is an array
  const addTask = (): void => {
    // Note we can't simply 'setToDoList ([...todoList, task])' as we're not only trying to keep track of 'task' which is a sting, we need to keep track of both the task and the deadline and therefore need to handle this with an object.
    // newTask is therefore an object which incorporates the interface we created in our .ts file. This includes 'taskName' which must be a string is updated by 'task', and the 'deadline', which must be a number, and is updated by 'deadline' state
    const newTask = { taskName: task, deadline: deadline };

    // the new list will contain all of the old list, plus the new task added

    setToDoList([...todoList, newTask]);

    console.log(todoList);
    // this resets our input fields so the user can add their next item
    setTask("");
    setDeadline(Number);
  };

  // this enables us to remove the task once it's been completed/we've clicked the button to complete it
  const completeTask = (TaskToDelete: string): void => {
    setToDoList(
      // todolist will become the filtered todoList
      todoList.filter((task) => {
        // and if the task.taskname isn't the same as our tasktodelete, we won't delete it/we'll return it..
        return task.taskName != TaskToDelete;
        // So how do we get our TaskToDelete? We get it from the ToDoTask.tsx component and so have to call the function from inside of ToDoTask.tsx
      })
    );
  };

  return (
    <>
      <div className="App">
        {/* className 'header' will be where we have our input */}
        <div className="header">
          <div className="inputArea">
            <input
              type="text"
              placeholder="Todo..."
              onChange={handleChange}
              value={task}
              name="task"
            ></input>
            <input
              className="deadlineDays"
              type="number"
              placeholder="Deadline in days"
              onChange={handleChange}
              value={deadline}
              name="deadline"
            ></input>
          </div>
          {/* button below will update the state of our todo list and then ensure the fields are reset so user can input new items */}
          <button onClick={addTask}>Add Todo</button>
        </div>
        {/* className 'todolist' will be where we see/can update all of our tasks */}
        <div className="todolist">
          {/* we map over our todo list and for each 'task' we create a new instance of ToDoTask rendering this to screen*/}
          {/* Again, we validate each iteration - 'task' with ITask and give it a key (which will be the next element in map's iteration) so we don't get a unique key identifier warning */}
          {todoList.map((task: ITask, key: number) => {
            return (
              // for each iteration a new instance of ToDoTask is created. The function's argument of 'task' is given the 'task' in useState. We're also going to send ToDoTask.tsx the completeTask function as a props called completeTask.
              <ToDoTask key={key} task={task} completeTask={completeTask} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;

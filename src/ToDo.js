import React, { useState } from 'react';
import './ToDo.css';

function ToDo() {
  // State to hold tasks under each status
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  // Function to add a new task to the "DOING" section
  function newTask() {
    const taskDescription = prompt("Enter the task description:"); // Prompt for task description
    if (taskDescription) {
      const newTask = { id: Date.now(), description: taskDescription, isEditing: false };
      setDoingTasks([...doingTasks, newTask]);
    }
  }

  // Function to switch task between "DOING" and "DONE"
  function switchDataStatus(taskId, currentStatus) {
    if (currentStatus === "doing") {
      const task = doingTasks.find(task => task.id === taskId);
      setDoingTasks(doingTasks.filter(task => task.id !== taskId));
      setDoneTasks([...doneTasks, task]);
    } else if (currentStatus === "done") {
      const task = doneTasks.find(task => task.id === taskId);
      setDoneTasks(doneTasks.filter(task => task.id !== taskId));
      setDoingTasks([...doingTasks, task]);
    }
  }

  // Function to remove task
  function removeTask(taskId, currentStatus) {
    if (currentStatus === "doing") {
      setDoingTasks(doingTasks.filter(task => task.id !== taskId));
    } else if (currentStatus === "done") {
      setDoneTasks(doneTasks.filter(task => task.id !== taskId));
    }
  }

  // Function to toggle editing mode for a task
  function toggleEdit(taskId, currentStatus) {
    if (currentStatus === "doing") {
      setDoingTasks(doingTasks.map(task => 
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      ));
    } else if (currentStatus === "done") {
      setDoneTasks(doneTasks.map(task => 
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      ));
    }
  }

  // Function to handle task text update only when Save is clicked
  function updateTaskText(taskId, newText, currentStatus) {
    if (currentStatus === "doing") {
      setDoingTasks(doingTasks.map(task => 
        task.id === taskId ? { ...task, description: newText, isEditing: false } : task
      ));
    } else if (currentStatus === "done") {
      setDoneTasks(doneTasks.map(task => 
        task.id === taskId ? { ...task, description: newText, isEditing: false } : task
      ));
    }
  }

  return (
    <div>
      <h1>TO DO</h1>
      <button onClick={newTask}>NEW TASK +</button>

      <h2>DOING</h2>
      {doingTasks.length === 0 ? (
        <p>No tasks to show in DOING</p>
      ) : (
        doingTasks.map(task => (
          <div className="task" key={task.id} data-status="doing">
            <button onClick={() => removeTask(task.id, "doing")}>Delete</button>
            {task.isEditing ? (
              <input
                type="text"
                value={task.description}
                onChange={(e) => setDoingTasks(doingTasks.map(t => 
                  t.id === task.id ? { ...t, description: e.target.value } : t
                ))}
              />
            ) : (
              <p>{task.description}</p>
            )}
            <button onClick={() => switchDataStatus(task.id, "doing")}>Move \/</button>
            <button onClick={() => toggleEdit(task.id, "doing")}>
              {task.isEditing ? "Save" : "Edit"}
            </button>
          </div>
        ))
      )}

      <h2>DONE</h2>
      {doneTasks.length === 0 ? (
        <p>No tasks to show in DONE</p>
      ) : (
        doneTasks.map(task => (
          <div className="task" key={task.id} data-status="done">
            <button onClick={() => removeTask(task.id, "done")}>Delete</button>
            {task.isEditing ? (
              <input
                type="text"
                value={task.description}
                onChange={(e) => setDoneTasks(doneTasks.map(t => 
                  t.id === task.id ? { ...t, description: e.target.value } : t
                ))}
              />
            ) : (
              <p style={{ textDecoration: 'line-through' }}>{task.description}</p>
            )}
            <button onClick={() => switchDataStatus(task.id, "done")}>Move /\</button><br></br>
            <button onClick={() => toggleEdit(task.id, "done")}>
              {task.isEditing ? "Save" : "Edit"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ToDo;

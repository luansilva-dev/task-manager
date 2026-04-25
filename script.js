// Load tasks from localStorage, or start with an empty array if none exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display all tasks on the screen
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = ""; // Clear current list before re-rendering

  // Loop through each task in the array
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    // If task is completed, apply "completed" style
    if (task.completed) {
      li.classList.add("completed");
    }

    // Toggle task completion when clicking the task
    li.onclick = () => toggleTask(index);

    // Create delete button
    const btn = document.createElement("button");
    btn.textContent = "X";

    // Delete task when button is clicked
    btn.onclick = (e) => {
      e.stopPropagation(); // Prevent triggering li click (toggle)
      deleteTask(index);
    };

    li.appendChild(btn); // Add button to list item
    list.appendChild(li); // Add list item to the UI
  });

  // Save updated tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
  const input = document.getElementById("taskInput");

  // Prevent adding empty tasks
  if (input.value.trim() === "") return;

  // Add new task object to array
  tasks.push({ text: input.value, completed: false });

  input.value = ""; // Clear input field

  renderTasks(); // Re-render task list
}

// Function to toggle task completion (done / not done)
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  renderTasks();
}

// Initial render when page loads
renderTasks();

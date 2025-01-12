import "./styles.css";

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [new Task("My task", "this is a test", "01/01/25", "1")];
  }

  addTask(name, description, date, priority) {
    this.tasks.push(new Task(name, description, date, priority));
  }

  removeTask(name) {
    this.tasks.filter((task) => task.name != name);
  }
}

class Task {
  constructor(name, description, date, priority) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
  }
}

if (localStorage.getItem("start") == null) {
  localStorage.setItem("data", JSON.stringify([new Project("My Project")]));
} else {
  localStorage.setItem("start", "done");
}

const projectsDiv = document.querySelector("#projects");
const tasksDiv = document.querySelector("#tasks");
let data = JSON.parse(localStorage.getItem("data"));
for (let i = 0; i < data.length; i++) {
  let project = document.createElement("div");
  project.textContent = data[i].name;
  project.classList.add("project");
  projectsDiv.appendChild(project);
}

projectsDiv.addEventListener("click", (e) => {
  if (!e.target.classList.contains("project")) {
    return;
  }

  e.target.classList.add("active");
  displayProjectTasks(
    data.find((project) => project.name == e.target.textContent),
  );
});

function displayProjectTasks(project) {
  for (let task of project.tasks) {
    const taskHtml = document.createElement("div");
    taskHtml.classList.add("task");

    const taskName = document.createElement("p");
    taskName.classList.add("task-name");
    taskName.textContent = task.name;

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.description;

    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date");
    taskDate.textContent = task.date;

    taskHtml.appendChild(taskName);
    taskHtml.appendChild(taskDescription);
    taskHtml.appendChild(taskDate);
    tasksDiv.appendChild(taskHtml);
  }
}

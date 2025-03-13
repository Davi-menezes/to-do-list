var formTask = document.getElementById("form-task");
var taskInput = document.getElementById("task");
var btnAdd = document.getElementById("btn-add");
var taskDiv = document.getElementById("tasks");

function addTask() {
  var taskValue = taskInput.value;
  fetch("../backend/add_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `addtask=${encodeURIComponent(taskValue)}`,
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
      taskInput.value = "";
      getTask();
    })
    .catch((error) => console.error("Erro ao adicionar tarefa:", error));
}

function getTask() {
  fetch("../backend/get_task.php")
    .then((response) => response.json())
    .then((tasks) => {
      taskDiv.innerHTML = "";
      tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
                <input type="checkbox" name="progress" class="progress" ${
                  task.status === "concluida" ? "checked" : ""
                }>
                <p class="task-description ${
                  task.status === "concluida" ? "done" : ""
                }">${task.task}</p>
                <div class="task-actions">
                    <a class="action-button edit-button">
                        <i class="fa-solid fa-pen-to-square" style="color: green;"></i>
                    </a>
                    <a href="#" class="action-button delete-button" data-id="${
                      task.id
                    }">
                        <i class="fa-solid fa-trash" style="color: #e01b24;"></i>
                    </a>
                </div>
                <form action="../backend/update_task.php" class="to-do-form edit-task hidden">
                    <input type="text" name="edit-task" placeholder="editar tarefa..." value="${
                      task.task
                    }">
                    <input type="hidden" name="id" value="${task.id}">
                    <input type="hidden" name="status" value="${task.status}">
                    <button type="submit" class="buttonform confirmbutton">
                        <i class="fa-solid fa-check"></i>
                    </button>
                </form>
            `;
        taskDiv.appendChild(taskElement);
      });
    })
    .catch((error) => console.error("Erro ao recuperar tarefas:", error));
}

formTask.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

taskDiv.addEventListener("click", (event) => {
  if (event.target.closest(".delete-button")) {
    event.preventDefault();
    const id = event.target.closest(".delete-button").dataset.id;
    deleteTask(id);
  }
});

taskDiv.addEventListener("submit", (event) => {
  if (event.target.closest(".edit-task")) {
    event.preventDefault();
    const form = event.target.closest(".edit-task");
    updateTask(new FormData(form));
  }
});

taskDiv.addEventListener("change", (event) => {
  if (event.target.closest(".progress")) {
    const checkbox = event.target.closest(".progress");
    const taskElement = checkbox.closest(".task");
    const id = taskElement.querySelector(".delete-button").dataset.id;
    const status = checkbox.checked ? "concluida" : "pendente";
    updateTaskStatus(id, status);
    taskElement
      .querySelector(".task-description")
      .classList.toggle("done", checkbox.checked);
  }
});

function deleteTask(id) {
  fetch("../backend/delete_task.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${encodeURIComponent(id)}`,
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
      getTask();
    })
    .catch((error) => console.error("Erro ao deletar tarefa:", error));
}

function updateTask(formData) {
  fetch("../backend/update_task.php", {
    method: "POST",
    body: new URLSearchParams(formData),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
      getTask();
    })
    .catch((error) => console.error("Erro ao atualizar tarefa:", error));
}

function updateTaskStatus(id, status) {
  fetch("../backend/update_task_status.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `id=${encodeURIComponent(id)}&status=${encodeURIComponent(status)}`,
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    })
    .catch((error) =>
      console.error("Erro ao atualizar status da tarefa:", error)
    );
}

getTask();

$(document).ready(function () {
  $(document).on("click", ".edit-button", function () {
    var $task = $(this).closest(".task");
    $task.find(".progress").addClass("hidden");
    $task.find(".task-description").addClass("hidden");
    $task.find(".task-actions").addClass("hidden");
    $task.find(".edit-task").removeClass("hidden");
  });

  $(document).on("click", ".progress", function () {
    if ($(this).is(":checked")) {
      $(this).addClass("done");
    } else {
      $(this).removeClass("done");
    }
  });
});
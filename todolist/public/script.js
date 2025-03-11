var formTask = document.getElementById('form-task');
var taskInput = document.getElementById('task');
var btnAdd = document.getElementById('btn-add');
var taskDiv = document.getElementById('tasks');

function addTask() {
    var taskValue = taskInput.value;
    fetch('../backend/add_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `addtask=${encodeURIComponent(taskValue)}`
    })
    .then(response => response.text())
    .then(message => {
        console.log(message);
        taskInput.value = '';
        getTask();
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
}

function getTask() {
    fetch('../backend/get_task.php')
    .then(response => response.json())
    .then(tasks => {
        taskDiv.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <input type="checkbox" name="progress" class="progress">
                <p class="task-description">${task.task}</p>
                <div class="task-actions">
                    <a class="action-button edit-button">
                        <i class="fa-solid fa-pen-to-square" style="color: green;"></i>
                    </a>
                    <a href="../backend/delete_task.php?id=${task.id}" class="action-button delete-button">
                        <i class="fa-solid fa-trash" style="color: #e01b24;"></i>
                    </a>
                </div>
                <form action="../backend/update_task.php" class="to-do-form edit-task hidden">
                    <input type="text" name="edit-task" placeholder="editar tarefa...">
                    <button type="submit" class="buttonform confirmbutton">
                        <i class="fa-solid fa-check"></i>
                    </button>
                </form>
            `;
            taskDiv.appendChild(taskElement);
        });
    })
    .catch(error => console.error('Erro ao recuperar tarefas:', error));
}

formTask.addEventListener('submit', event => {
    event.preventDefault();
    addTask();
});

getTask();


$(document).ready(function(){
    $('.edit-button').on('click', function () {
        var $task = $(this).closest('.task');
        $task.find('.progress').addClass('hidden');
        $task.find('.task-description').addClass('hidden');
        $task.find('.task-actions').addClass('hidden');
        $task.find('.edit-task').removeClass('hidden');
    });

    $('.progress').on('click', function () {
        if ($(this).is(':checked')){
            $(this).addClass('done');
        } else {
            $(this).removeClass('done');
        }
    });
});

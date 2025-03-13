# To-Do List

## Mudanças Feitas

### 1. Atualização do JavaScript (`script.js`)

- **Função `addTask`**: Adiciona uma nova tarefa ao banco de dados.
- **Função `getTask`**: Recupera todas as tarefas do banco de dados e as exibe na página.
- **Função `deleteTask`**: Deleta uma tarefa do banco de dados.
- **Função `updateTask`**: Atualiza uma tarefa no banco de dados.
- **Função `updateTaskStatus`**: Atualiza o status de uma tarefa (concluída ou pendente) no banco de dados.
- **Eventos**:
  - `formTask.addEventListener("submit", ...)`: Adiciona uma nova tarefa quando o formulário é enviado.
  - `taskDiv.addEventListener("click", ...)`: Deleta uma tarefa quando o botão de deletar é clicado.
  - `taskDiv.addEventListener("submit", ...)`: Atualiza uma tarefa quando o formulário de edição é enviado.
  - `taskDiv.addEventListener("change", ...)`: Atualiza o status de uma tarefa quando a checkbox é marcada ou desmarcada.

### 2. Criação de um novo arquivo PHP (`update_task_status.php`)

- **`update_task_status.php`**: Atualiza apenas o status de uma tarefa no banco de dados.

### 3. Atualização do CSS (`style.css`)

- **Classe `.task-description.done`**: Adiciona um estilo riscado ao texto da tarefa quando a checkbox é marcada.
- **Outras classes e estilos**: Ajustes para centralizar o texto e adicionar espaço entre as tarefas.

## Explicação do Código JavaScript

### Função `addTask`

```javascript
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
```

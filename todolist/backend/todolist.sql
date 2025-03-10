CREATE DATABASE todo_list_db;
USE todo_list_db;
CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
task VARCHAR(255) NOT NULL,
status ENUM('pendente', 'concluida') DEFAULT 'pendente',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
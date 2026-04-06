import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service'; 
import { Todo } from './models/todo.model'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  // Твій залізобетонний ID
  USER_ID = 12; 

  todos: Todo[] = [];
  isLoading = false;
  isEditing = false;
  currentEditId: string | null = null;

  // Форма ініціалізується з твоїм ID
  formData: Todo = this.getEmptyForm();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  getEmptyForm(): Todo {
    return {
      userId: this.USER_ID,
      title: '',
      description: '',
      tag: 'Робота',
      deadline: '',
      isDone: false
    };
  }

  // Отримуємо тільки ТВОЇ завдання
  fetchTodos() {
    this.isLoading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        // Фільтруємо масив, щоб бачити лише задачі студента 12
        this.todos = data
          .filter(t => t.userId === this.USER_ID)
          .reverse();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Помилка завантаження:', err);
        this.isLoading = false;
      }
    });
  }

  // Відправка форми
  onSubmit() {
    // ГОЛОВНИЙ ФІКС: Примусово ставимо 12 перед відправкою
    this.formData.userId = this.USER_ID;

    if (this.isEditing && this.currentEditId) {
      // Редагування існуючого
      this.todoService.update(this.currentEditId, this.formData).subscribe(() => {
        this.fetchTodos();
        this.resetForm();
      });
    } else {
      // Створення нового
      this.formData.createdAt = Math.floor(Date.now() / 1000);
      this.todoService.add(this.formData).subscribe({
        next: (newTask) => {
          // Додаємо в список лише якщо сервер підтвердив твій ID
          if (newTask.userId === this.USER_ID) {
            this.todos.unshift(newTask);
          }
          this.resetForm();
        }
      });
    }
  }

  // Видалення
  deleteTask(id: string | undefined) {
    if (!id || !confirm("Видалити цю задачу?")) return;
    this.todoService.remove(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  // Швидка зміна статусу
  toggleDone(task: Todo) {
    const updatedStatus = !task.isDone;
    if(task.id) {
      // Примусово вказуємо свій ID і тут про всяк випадок
      this.todoService.update(task.id, { isDone: updatedStatus, userId: this.USER_ID }).subscribe(() => {
        task.isDone = updatedStatus;
      });
    }
  }

  // Редагування
  editTask(task: Todo) {
    this.isEditing = true;
    this.currentEditId = task.id || null;
    // Копіюємо дані і ГАРАНТУЄМО, що userId буде 12, а не 4
    this.formData = { ...task, userId: this.USER_ID }; 
  }

  resetForm() {
    this.isEditing = false;
    this.currentEditId = null;
    this.formData = this.getEmptyForm();
  }
}
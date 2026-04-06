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
  USER_ID = 12; // ТВІЙ НОМЕР

  todos: Todo[] = [];
  isLoading = false;
  isEditing = false;
  currentEditId: string | null = null;
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

  fetchTodos() {
    this.isLoading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        // Фільтруємо, щоб бачити тільки свої задачі
        this.todos = data.filter(t => t.userId === this.USER_ID).reverse();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // --- ОСЬ ЦЕЙ МЕТОД ЗАМІНИ ---
  onSubmit() {
    // Створюємо копію даних і ЖОРСТКО прописуємо 12
    const dataToSend = { 
      ...this.formData, 
      userId: this.USER_ID 
    };

    console.log('Відправляю дані:', dataToSend);

    if (this.isEditing && this.currentEditId) {
      this.todoService.update(this.currentEditId, dataToSend).subscribe(() => {
        this.fetchTodos();
        this.resetForm();
      });
    } else {
      dataToSend.createdAt = Math.floor(Date.now() / 1000);
      this.todoService.add(dataToSend).subscribe({
        next: (newTask) => {
          console.log('Сервер прийняв:', newTask);
          this.fetchTodos(); // Оновлюємо список з сервера
          this.resetForm();
        }
      });
    }
  }
  // ---------------------------

  deleteTask(id: string | undefined) {
    if (!id || !confirm("Видалити цю задачу?")) return;
    this.todoService.remove(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  toggleDone(task: Todo) {
    const updatedStatus = !task.isDone;
    if(task.id) {
      this.todoService.update(task.id, { isDone: updatedStatus, userId: this.USER_ID }).subscribe(() => {
        task.isDone = updatedStatus;
      });
    }
  }

  editTask(task: Todo) {
    this.isEditing = true;
    this.currentEditId = task.id || null;
    // При редагуванні теж форсуємо твій ID
    this.formData = { ...task, userId: this.USER_ID }; 
  }

  resetForm() {
    this.isEditing = false;
    this.currentEditId = null;
    this.formData = this.getEmptyForm();
  }
}
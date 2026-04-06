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
  USER_ID = 12; // ТВІЙ НОМЕР ЗА ЖУРНАЛОМ [cite: 142]

  todos: Todo[] = [];
  isLoading = false;
  isEditing = false;
  currentEditId: string | null = null;

  // Порожня форма для створення нового завдання [cite: 153]
  formData: Todo = this.getEmptyForm();

  // Dependency Injection: Angular сам передає сервіс у конструктор [cite: 148]
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos(); // Завантажуємо дані при старті [cite: 151]
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

  // Отримання списку всіх завдань [cite: 163]
  fetchTodos() {
    this.isLoading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        // Фільтруємо або просто показуємо (зазвичай краще фільтрувати за своїм ID)
        this.todos = data.reverse();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Відправка форми (створення або редагування) [cite: 177]
  onSubmit() {
    if (this.isEditing && this.currentEditId) {
      // Якщо редагуємо — викликаємо update [cite: 179]
      this.todoService.update(this.currentEditId, this.formData).subscribe(() => {
        this.fetchTodos();
        this.resetForm();
      });
    } else {
      // Якщо нове — додаємо [cite: 185]
this.todoService.add(this.formData).subscribe({
  next: (newTask) => {
    const fixedTask = {
      ...newTask,
      userId: this.USER_ID
    };

    this.todos.unshift(fixedTask);
    this.resetForm();
  }
});
    }
  }

  // Видалення завдання [cite: 194]
  deleteTask(id: string | undefined) {
    if (!id || !confirm("Видалити цю задачу?")) return;
    this.todoService.remove(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  // Швидке перемикання статусу виконано/не виконано [cite: 200]
  toggleDone(task: Todo) {
    const updatedStatus = !task.isDone;
    if(task.id) {
      this.todoService.update(task.id, { isDone: updatedStatus }).subscribe(() => {
        task.isDone = updatedStatus;
      });
    }
  }

  // Перехід у режим редагування [cite: 208]
  editTask(task: Todo) {
    this.isEditing = true;
    this.currentEditId = task.id || null;
    this.formData = { ...task }; // Копіюємо дані в форму
  }

  resetForm() {
    this.isEditing = false;
    this.currentEditId = null;
    this.formData = this.getEmptyForm();
  }
}
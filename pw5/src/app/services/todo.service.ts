import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = "https://69b11abdadac80b427c3fff2.mockapi.io/api/v1/todoItem";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // --- ОСЬ ТУТ МИ ВСЕ ФІКСИМО ---
  add(todo: Todo): Observable<Todo> {
    // Створюємо копію об'єкта і ЖОРСТКО вписуємо твій ID
    const fixedTodo = { ...todo, userId: 12 }; 
    
    console.log('СЕРВІС ВІДПРАВЛЯЄ НА СЕРВЕР:', fixedTodo);
    
    return this.http.post<Todo>(this.apiUrl, fixedTodo);
  }

  update(id: string, data: Partial<Todo>): Observable<Todo> {
    // Навіть при оновленні гарантуємо, що ID твій
    const fixedData = { ...data, userId: 12 };
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, fixedData);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
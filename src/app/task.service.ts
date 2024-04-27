import { Injectable } from '@angular/core';
import { Task, TaskForm } from './task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string;
  constructor(private httpService: HttpClient) {
    this.baseUrl = 'https://localhost:7239/Tasks';
  }

  public task: Task;

  public setTask(task: Task) {
    this.task = task;
  }

  public getTask(): Observable<Task[]> {
    return this.httpService.get<Task[]>(this.baseUrl);
  }

  public postTask(task: TaskForm): void {
    this.httpService.post(this.baseUrl, task).subscribe();
  }

  public getTaskById(id: number): Observable<Task> {
    return this.httpService.get<Task>(`${this.baseUrl}/GetTasksById?id=${id}`);
  }

  public putTaskById(id: number, task: Task): void {
    this.httpService.put(`${this.baseUrl}?id=${id}`, task).subscribe();
  }
}

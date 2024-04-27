import { Component, OnInit } from '@angular/core';
import { Task, TaskForm } from '../task';
import { Route, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-get-tasks',
  templateUrl: './get-tasks.component.html',
  styleUrls: ['./get-tasks.component.css'],
})
export class GetTasksComponent implements OnInit {
  public tasks: Task[];

  public filterTasks: Task[];
  public task: Task;
  public isButtonupdate: boolean;

  constructor(private router: Router, private taskService: TaskService) {
    this.taskService.getTask().subscribe((data) => {
      this.filterTasks = data;
      this.tasks = data;
    });
  }

  ngOnInit(): void {}

  public getAllTasks(): void {
    this.taskService.getTask().subscribe((data) => {
      this.filterTasks = data;
      this.tasks = data;
    });
  }

  public filterAllTasks(title: string): void {
    if (!title.length) {
      this.filterTasks = this.tasks;
    } else {
      this.filterTasks = this.tasks.filter((item) =>
        item.title.toLowerCase().trim().includes(title.toLowerCase().trim())
      );
    }
  }

  public taskHandler(taskData: TaskForm): void {
    this.filterTasks.push({
      title: taskData.title,
      description: taskData.description,
      id: Math.max(...this.filterTasks.map((item) => item.id)) + 1,
      dueDate: taskData.dueDate,
    });
  }

  public editTask(task: Task): void {
    this.router.navigate(['updatetask', task.id]);
  }

  public AddTask(): void {
    this.router.navigate(['/addtask']);
  }
}

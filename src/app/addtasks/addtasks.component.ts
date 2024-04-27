import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskForm } from '../task';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.css'],
})
export class AddtasksComponent implements OnInit {
  form: FormGroup;
  // @Output() taskData: EventEmitter<TaskForm> = new EventEmitter<TaskForm>();
  // @Input() btnUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  public addTask(): void {
    this.taskService.postTask(this.form.value as TaskForm);
    this.route.navigate(['']);
  }
}

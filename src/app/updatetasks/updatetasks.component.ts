import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatetasks',
  templateUrl: './updatetasks.component.html',
  styleUrls: ['./updatetasks.component.css'],
})
export class UpdatetasksComponent implements OnInit {
  public task: Task;
  form: FormGroup;
  public isDataLoaded: boolean;
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isDataLoaded = false;
  }

  ngOnInit(): void {
    this.getTaskData();
  }

  public updateTask(): void {
    if (this.form.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.task = this.form.value;
      this.task.id = id;
      this.taskService.putTaskById(this.task.id, this.task);
      this.router.navigate(['']);
    }
  }

  private getTaskData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(id).subscribe((data) => {
      if (data) {
        this.task = data;
        this.initializeForm();
        this.isDataLoaded = true;
      }
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      title: [this.task[0].title, Validators.required],
      description: [this.task[0].description, Validators.required],
      dueDate: [this.task[0].dueDate, Validators.required],
    });
  }
}

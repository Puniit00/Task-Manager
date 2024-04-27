import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetTasksComponent } from './get-tasks/get-tasks.component';
import { AddtasksComponent } from './addtasks/addtasks.component';
import { UpdatetasksComponent } from './updatetasks/updatetasks.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: '',
    component: GetTasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addtask',
    component: AddtasksComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'updatetask/:id',
    component: UpdatetasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

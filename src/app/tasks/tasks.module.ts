import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TasksService } from './services/tasks.service';
import { TasksComponent } from './containers/tasks/tasks.component';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskGuard } from './guards/task.guard';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    canActivate: [TaskGuard],
  },
];

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskEditComponent,
    TaskCreateComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [TaskGuard],
  entryComponents: [TaskCreateComponent],
})
export class TasksModule {}

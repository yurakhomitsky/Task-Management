import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TasksService } from './services/tasks.service';
import { TasksComponent } from './containers/tasks/tasks.component';




@NgModule({
  declarations: [TasksComponent],
  imports: [
    SharedModule
  ],
  providers: []
})
export class TasksModule { }

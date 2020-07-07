import { Component, OnInit, ComponentFactoryResolver, ComponentFactory, ViewChild, ViewContainerRef } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types/task.interface';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { Observable } from 'rxjs';
import { TaskStatus } from '../../types/task-status.enum';
import { MessagesService } from '../../../shared/components/messages/messages.service';
import { MessagesTypes } from 'src/app/shared/components/messages/messages.types.enum';
import { TaskEditComponent } from '../../components/task-edit/task-edit.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from '../../components/task-create/task-create.component';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(
    private taskService: TasksService,
    private localStorageService: LocalStorageService,
    private messageService: MessagesService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.findAll().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    },
      (error) => {
        // this.messageService.showMessage(MessagesTypes.WARNING, 'Could not retrieve all tasks')
      })
  }

  findAll(): Observable<Task[]> {
    return this.taskService.findAll();
  }
  create(task: Task) {
    return this.taskService.create(task);
  }
  updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
    return this.taskService.updateTaskStatus(id, status)
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.taskService.update(id, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.taskService.delete(id);
  }

  createTask() {
   const dialogRef = this.dialog.open(TaskCreateComponent, {
     maxWidth: '1100px'
   })
   dialogRef.afterClosed().pipe(
     filter(task => task),
     switchMap((task) => this.create(task))
   )
   .subscribe(task => {
    this.messageService.showMessage(MessagesTypes.SUCCESS, 'Еask has been successfully created')
     this.tasks = [task, ...this.tasks ]
   })
  }

  onChangeStatus(task: Task) {
    this.updateTaskStatus(task.id, task.status).subscribe(() => { 
      this.messageService.showMessage(MessagesTypes.SUCCESS, 'Status task has been successfully updated')
    }, (error) => {
      this.messageService.showMessage(MessagesTypes.WARNING, 'Could not update status task')
    })
  }

  onEditTask(task: Task) {
    this.updateTask(task.id, task).subscribe((resTask: Task) => {
      this.messageService.showMessage(MessagesTypes.SUCCESS, 'Task has been successfully updated')
      this.tasks = this.tasks.map(tsk => tsk.id === task.id ? resTask : tsk)
    })
  }

  onRemovedTask(id: number) {
    this.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id!== id)
      this.messageService.showMessage(MessagesTypes.SUCCESS, 'Task has been successfully removed')
    })
  }

}

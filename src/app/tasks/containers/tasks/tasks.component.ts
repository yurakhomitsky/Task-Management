import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { MessagesTypes } from 'src/app/shared/components/messages/messages.types.enum';
import { MessagesService } from '../../../shared/components/messages/messages.service';
import { TaskCreateComponent } from '../../components/task-create/task-create.component';
import { TasksStore } from '../../services/tasks.store.service';
import { TaskStatus } from '../../types/task-status.enum';
import { Task } from '../../types/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(
    private tasksStore: TasksStore,
    private messageService: MessagesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  findAll(): Observable<Task[]> {
    return this.tasksStore.tasks$;
  }
  create(task: Task) {
    return this.tasksStore.create(task);
  }
  updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
    return this.tasksStore.updateTaskStatus(id, status);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.tasksStore.update(id, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.tasksStore.delete(id);
  }

  createTask() {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
      maxWidth: '1100px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((task) => task),
        switchMap((task) => this.create(task))
      )
      .subscribe(() => {
        this.messageService.showMessage(
          MessagesTypes.SUCCESS,
          'Еask has been successfully created'
        );
      });
  }

  onChangeStatus(task: Task) {
    this.updateTaskStatus(task.id, task.status).subscribe(() => {
      this.messageService.showMessage(
        MessagesTypes.SUCCESS,
        'Status task has been successfully updated'
      );
    });
  }

  onEditTask(task: Task) {
    this.updateTask(task.id, task).subscribe(() => {
      this.messageService.showMessage(
        MessagesTypes.SUCCESS,
        'Task has been successfully updated'
      );
    });
  }

  onRemovedTask(id: number) {
    this.deleteTask(id).subscribe(() => {
      this.messageService.showMessage(
        MessagesTypes.SUCCESS,
        'Task has been successfully removed'
      );
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { MessagesService } from '../../shared/components/messages/messages.service';
import { TasksService } from './tasks.service';
import { Task } from '../types/task.interface';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { MessagesTypes } from '../../shared/components/messages/messages.types.enum';
import { TaskStatus } from '../types/task-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TasksStore {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(
    private messageService: MessagesService,
    private taskService: TasksService
  ) {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.taskService
      .findAll()
      .pipe(
        catchError((err) => {
          const message = 'Could not retrieve all tasks';
          this.messageService.showMessage(MessagesTypes.WARNING, message);
          return throwError(err);
        }),
        tap((tasks: Task[]) => {
          this.tasksSubject.next(tasks);
        })
      )
      .subscribe();
  }

  create(task: Task) {
    let tasks = this.tasksSubject.getValue();
    tasks = [task, ...tasks];

    this.tasksSubject.next(tasks);
    return this.taskService.create(task).pipe(
      catchError((err) => {
        this.messageService.showMessage(
          MessagesTypes.WARNING,
          'Could not create task'
        );
        return throwError(err);
      }),
      shareReplay()
    );
  }
  updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
    let tasks = this.tasksSubject.getValue();
    const task = tasks.find((tsk) => tsk.id === id);

    tasks = tasks.map((tsk) =>
      tsk.id === id
        ? {
            ...task,
            status,
          }
        : tsk
    );

    this.tasksSubject.next(tasks);

    return this.taskService.updateTaskStatus(id, status).pipe(
      catchError((err) => {
        this.messageService.showMessage(
          MessagesTypes.WARNING,
          'Could not update status task'
        );
        return throwError(err);
      }),
      shareReplay()
    );
  }

  update(id: number, task: Task): Observable<Task> {
    let tasks = this.tasksSubject.getValue();
    tasks = tasks.map((tsk) => (tsk.id === id ? task : tsk));

    this.tasksSubject.next(tasks);
    return this.taskService.update(id, task).pipe(
      catchError((err) => {
        this.messageService.showMessage(
          MessagesTypes.WARNING,
          'Could not update  task'
        );
        return throwError(err);
      }),
      shareReplay()
    );
  }

  delete(id: number): Observable<any> {
    let tasks = this.tasksSubject.getValue();
    tasks = tasks.filter((tsk) => tsk.id !== id);

    this.tasksSubject.next(tasks);
    return this.taskService.delete(id);
  }
}

import { AfterContentInit, AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { TaskStatus } from '../../types/task-status.enum';
import { Task } from '../../types/task.interface';
import { TaskEditComponent } from '../task-edit/task-edit.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  @ViewChild('taskDisplay') displayTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;
  @ContentChild(TaskEditComponent) taskEditTemplate: TaskEditComponent;

  taskStatus = Object.keys(TaskStatus);
  currentStatus: TaskStatus;
  isEditing = false;



  @Input() task: Task;

  @Output() changeStatus: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() editedTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() removedTask: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
   this.currentStatus = this.task?.status || TaskStatus.OPEN;
  }

  ngAfterViewInit() {

  }

  onChange(status: TaskStatus) {
      this.changeStatus.emit({
        ...this.task,
        status
      });
  }

  onEdit() {
    
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.taskEditTemplate.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
    })
    } else {
      this.editedTask.emit({
        id: this.task.id,
        ...this.taskEditTemplate.taskForm.value,
        userId: this.task.userId
      });
    }
  }

  onDelete() {
    this.removedTask.emit(this.task.id);
  }

  getTemplate() {
    return this.isEditing ? this.taskEditTemplate.editTemplate : this.displayTemplate;
  }
}

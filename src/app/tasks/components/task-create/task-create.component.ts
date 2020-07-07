import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../types/task.interface';
import { TaskStatus } from '../../types/task-status.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  taskStatus = Object.keys(TaskStatus);

  taskForm: FormGroup;

  title: FormControl;
  description: FormControl;

  constructor(public dialogRef: MatDialogRef<TaskCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: Task) { }

  
  

  ngOnInit(): void {
    this.initForm();
}
  


  private initForm(): void {
    this.initFormControls();
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,

    })
    
  }

  private initFormControls(): void {
    this.title = new FormControl('', [
      Validators.required]);

    this.description = new FormControl('');

  }
  onCreate() {
    this.dialogRef.close(this.taskForm.value);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}

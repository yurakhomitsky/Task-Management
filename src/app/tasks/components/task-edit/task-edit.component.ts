import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from '../../types/task-status.enum';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  taskStatus = Object.keys(TaskStatus);

  taskForm: FormGroup;

  title: FormControl;
  description: FormControl;
  status: FormControl;
  

  constructor() { }

  ngOnInit(): void {
    this.initForm();
}
  


  private initForm(): void {
    this.initFormControls();
    this.taskForm = new FormGroup({
      title: this.title,
      description: this.description,
      status: this.status
    })
    
  }

  private initFormControls(): void {
    this.title = new FormControl('', [
      Validators.required]),

    this.description = new FormControl(''),
    this.status = new FormControl('')
  }


}

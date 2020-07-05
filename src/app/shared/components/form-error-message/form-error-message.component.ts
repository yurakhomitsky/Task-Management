import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlErrorMessages } from '../../types/controlErrorMessages.interface';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class FormErrorMessageComponent implements OnInit, OnChanges {
  @Input() controlObj: FormControl;
  @Input() controlErrorMessages: ControlErrorMessages;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  getErrorMessage(){
   return Object.keys(this.controlErrorMessages).map(keyError => {
      return this.controlObj.hasError(keyError) ? this.controlErrorMessages[keyError](this.controlObj.errors[keyError]) : this.controlErrorMessages['default']();
    }) 

  }
}

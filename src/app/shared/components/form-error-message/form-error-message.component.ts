import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class FormErrorMessageComponent implements OnInit, OnChanges {

  @Input() errors: string[];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    
  }

}

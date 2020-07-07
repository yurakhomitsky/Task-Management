import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Observable, timer } from 'rxjs';
import { tap, finalize, delayWhen, timeInterval, timeout } from 'rxjs/operators';
import { Message } from './message.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  messages$: Observable<Message>;

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    this.messages$ = this.messageService.messages$.pipe(
      tap(() => {
        this.showMessages = true;
        setTimeout(() => this.showMessages = false, 2500)
      }),
    )
  }

  onClose() {
    this.showMessages = false;
  }

}

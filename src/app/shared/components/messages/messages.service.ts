import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesComponent } from './messages.component';
import { MessagesTypes } from './messages.types.enum';
import { Message } from './message.interface';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    constructor(private snackBar: MatSnackBar) { }

    private messageSubject = new BehaviorSubject<Message>({
        type: MessagesTypes.INFO,
        messages: []
    });

    messages$: Observable<Message> = this.messageSubject.asObservable().pipe(
        filter(({messages}) => messages && messages.length > 0)
    );

    showMessage(type: MessagesTypes, ...messages: string[]) {
        this.messageSubject.next({
            type,
            messages
        });
    }
}
import { Component } from '@angular/core';
import { MessagesService } from './shared/components/messages/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'task-management';
}

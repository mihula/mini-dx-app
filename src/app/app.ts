import { Component, signal } from '@angular/core';
import { ProTextBox } from './pro-text-box/pro-text-box';

@Component({
  selector: 'app-root',
  imports: [ProTextBox],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pro-textbox-demo');
}

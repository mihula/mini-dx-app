import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ProTextBox } from './pro-text-box/pro-text-box';

@Component({
  selector: 'app-root',
  imports: [ProTextBox, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public data = {
    value: 'Some value',
    inheritedValue: 'Inherited value'
  }
}

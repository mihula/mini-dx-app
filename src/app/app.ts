import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ProTextBox, DataSet } from './pro-text-box/pro-text-box';

@Component({
  selector: 'app-root',
  imports: [ProTextBox, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public data: DataSet = {
    value: { value: 'Some value', ivalue: 'Inherited value' },
    other: { value: '', ivalue: 'Other inherited' }
  };
}

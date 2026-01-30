import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ProTextBox } from './pro-text-box/pro-text-box';

export type UniversalRecord = Record<string, unknown>;

@Component({
  selector: 'app-root',
  imports: [ProTextBox, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public data: UniversalRecord = {
    value: 'Some value',
    ivalue: 'Inherited value',
    id: 1,
  };
}

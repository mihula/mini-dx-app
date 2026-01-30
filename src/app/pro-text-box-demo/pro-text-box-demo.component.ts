import { Component } from '@angular/core';
import { ProTextBox } from './pro-text-box/pro-text-box';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'pro-text-box-demo',
  templateUrl: './pro-text-box-demo.component.html',
  styleUrls: ['./pro-text-box-demo.component.css'],
  imports: [ProTextBox, JsonPipe],
  standalone: true,
})
export class ProTextBoxDemoComponent {
  data = { value: 'My value', ivalue: 'Inherited' };
}

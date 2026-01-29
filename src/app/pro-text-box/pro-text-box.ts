import { Component, Input } from '@angular/core';
import { DxTextBoxModule } from 'devextreme-angular';

@Component({
  selector: 'pro-text-box',
  imports: [DxTextBoxModule],
  templateUrl: './pro-text-box.html',
  styleUrl: './pro-text-box.css',
  standalone: true,
})

export class ProTextBox {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  handleInput(e: any) {
    console.log('Input event:', e);
  }
}

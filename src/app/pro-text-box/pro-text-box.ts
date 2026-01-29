import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pro-text-box',
  imports: [DxTextBoxModule, FormsModule],
  templateUrl: './pro-text-box.html',
  styleUrl: './pro-text-box.css',
  standalone: true,
})

export class ProTextBox {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() inheritedValue: string = '';
  @Input() placeholder: string = '';

  onDxValueChanged(e: any) {
    this.value = e.value;
    this.valueChange.emit(e.value);
  }
}

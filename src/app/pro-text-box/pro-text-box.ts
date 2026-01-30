import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

export type DataSet = Record<string, { value: string; ivalue?: string }>;

@Component({
  selector: 'pro-text-box',
  imports: [DxTextBoxModule, FormsModule],
  templateUrl: './pro-text-box.html',
  styleUrl: './pro-text-box.css',
  standalone: true,
})

export class ProTextBox {
  @Input() data!: DataSet;
  @Input() fieldKey!: string;
  @Input() placeholder: string = '';
  @Output() dataChange = new EventEmitter<DataSet>();

  // Format: co zobrazit v inputu
  get displayValue(): string {
    const entry = this.data?.[this.fieldKey];
    if (!entry) return '';
    return entry.value === '' && entry.ivalue ? entry.ivalue : entry.value;
  }

  // Parse: co uložit do dat
  onValueChanged(e: any) {
    if (!this.data[this.fieldKey]) this.data[this.fieldKey] = { value: '' };
    this.data[this.fieldKey].value = e.value ?? '';
    this.dataChange.emit(this.data);
  }
}

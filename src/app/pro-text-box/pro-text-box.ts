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

  isShowingInherited(): boolean {
    return (this.inheritedValue !== null) && (this.value === '');
  }
  get displayValue(): string {
    return this.isShowingInherited() ? this.inheritedValue : this.value;
  }

  onDxValueChanged(e: any) {
    console.log('Value changed:', e.value);

    if (this.isShowingInherited() && (e.value === this.inheritedValue)) return;
    this.value = e.value;
    this.valueChange.emit(e.value);
  }
}

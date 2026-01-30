import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

export interface ProTextBoxModel {
  value: string;
  inheritedValue?: string;
}

@Component({
  selector: 'pro-text-box',
  imports: [DxTextBoxModule, FormsModule],
  templateUrl: './pro-text-box.html',
  styleUrl: './pro-text-box.css',
  standalone: true,
})

export class ProTextBox {
  @Input() model: ProTextBoxModel = { value: '' };
  @Output() modelChange = new EventEmitter<ProTextBoxModel>();
  @Input() placeholder: string = '';

  editingInherited = false;

  get displayValue(): string {
    if (this.model.value === '' && this.model.inheritedValue && !this.editingInherited) {
      return this.model.inheritedValue;
    }
    return this.model.value;
  }

  onDxFocusIn(e: any) {
    if (this.model.value === '' && this.model.inheritedValue && !this.editingInherited) {
      this.editingInherited = true;
      e.component.option('value', ''); // vyprázdní input
    }
  }

  onDxValueChanged(e: any) {
    if (this.editingInherited) {
      this.editingInherited = false;
    }
    this.model = { ...this.model, value: e.value ?? '' };
    this.modelChange.emit(this.model);
  }

  onDxFocusOut(e: any) {
    if (this.model.value === '' && this.model.inheritedValue) {
      this.editingInherited = false;
      e.component.option('value', this.model.inheritedValue);
    }
  }
}

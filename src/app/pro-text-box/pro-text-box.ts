import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DxTextBoxModule, DxTextBoxComponent } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

export type UniversalRecord = Record<string, unknown>;

@Component({
  selector: 'pro-text-box',
  imports: [DxTextBoxModule, FormsModule, NgIf],
  templateUrl: './pro-text-box.html',
  styleUrl: './pro-text-box.css',
  standalone: true,
})

export class ProTextBox {
  @Input() data!: UniversalRecord;
  @Input() fieldName!: string;
  @Input() inheritedFieldName!: string;
  @Input() placeholder: string = '';
  @Output() dataChange = new EventEmitter<UniversalRecord>();

  @ViewChild('textBoxRef', { static: false }) textBox?: DxTextBoxComponent;

  dirty = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // Format: co zobrazit v inputu
  get displayValue(): string {
    const value = (this.data?.[this.fieldName] as string) ?? '';
    const ivalue = (this.data?.[this.inheritedFieldName] as string) ?? '';
    return value === '' && ivalue ? ivalue : value;
  }

  // Parse: co uložit do dat
  onValueChanged(e: any) {
    this.data[this.fieldName] = e.value ?? '';
    this.dataChange.emit(this.data);
    this.dirty = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.textBox?.instance.repaint(); // nic nedela
    });
  }

  onInput() {
    this.dirty = true;
  }
}

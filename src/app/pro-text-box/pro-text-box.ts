import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DxTextBoxModule, DxTextBoxComponent } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { isEmpty } from 'rxjs';

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

  constructor() { }

  isEmptyValue(value: string | null = null): boolean {
    return value === '' || value === null;
  }

  isEmpty(): boolean {
    return this.isEmptyValue(this.getRealValue());
  }

  // mam inherited fieldname a ten klic existuje v data
  hasInherited(): boolean {
    return this.inheritedFieldName in this.data && this.data[this.inheritedFieldName] !== null;
  }

  isInherited(): boolean {
    return this.hasInherited() && this.isEmpty();
  }

  getRealValue(): string | null {
    return this.data?.[this.fieldName] as string;
  }

  getInheritedValue(): string | null {
    return this.data?.[this.inheritedFieldName] as string;
  }

  // Format: co zobrazit v inputu
  get displayValue(): string {
    const value = this.getRealValue() ?? '';
    const ivalue = this.getInheritedValue() ?? '';
    return this.isEmptyValue(value) && ivalue ? ivalue : value;
  }

  // Parse: co uložit do dat
  onValueChanged(e: any) {
    console.log(`onValueChanged: ${e.previousValue} => ${e.value}; dirty: ${this.dirty}`);
    let newValue = e.value;
    if (this.dirty) {
      if (this.isEmptyValue(newValue)) {
        console.log(`onValueChanged: there will be next onValueChanged with dirty==false which will set inherited value`);
        //let stillInherited = e.previousValue === this.getInheritedValue();
        //if (stillInherited)
        //  console.log(`onValueChanged: ...until it isn't... merde 💩`);
        this.data[this.fieldName] = null;
      }
      else {
        this.data[this.fieldName] = newValue;
      }
    }
    this.dataChange.emit(this.data);
    this.dirty = false;
  }

  onInput() {
    this.dirty = true;
  }

  onFocusOut(e: any) {
    if (this.isEmpty() && this.getInheritedValue()) {
      e.component.option('value', this.displayValue);
    }
  }
}

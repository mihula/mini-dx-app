import { Component, ViewChild, NgZone, Output, EventEmitter } from '@angular/core';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import { DxTextBoxComponent, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { ValidationCallbackData } from 'devextreme/common';
import { JsonPipe } from "@angular/common";

@Component({
  selector: 'app-async-value-change',
  imports: [DxTextBoxModule, DxValidatorModule, JsonPipe],
  templateUrl: './async-value-change.html',
  styleUrl: './async-value-change.css',
})
export class AsyncValueChange {
  @ViewChild('textBoxRef', { static: false }) textBox?: DxTextBoxComponent;

  // Emits every time the value changes (user input + programmatic sets).
  @Output() valueChanged = new EventEmitter<string>();

  public valueChangedEmitCount = 0;

  private _value = '';
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    const next = String(v ?? '');
    if (next === this._value) return;

    this._value = next;

    this.valueChangedEmitCount++;
    this.valueChanged.emit(this._value);
  }

  isValid = true;

  validationInProgress: boolean = false;

  /**
   * One-shot guard: when we set the widget value programmatically, suppress the next onValueChanged
   * (which DevExtreme fires immediately) to avoid re-entrancy / loops.
   */
  suppressNextValueChanged: boolean = false;

  /**
  * Monotonic counter used to ensure only the latest async value-change "wins".
  */
  private valueChangeSeq = 0;

  /**
   * Monotonic counter used to ensure only the latest async validation "wins".
   */
  private validationSeq = 0;

  constructor(private readonly ngZone: NgZone) { }

  async onValueChanged($event: ValueChangedEvent) {
    const incoming = String($event.value ?? '');

    if ((this.suppressedValue !== null && incoming === this.suppressedValue)
      || this.suppressNextValueChanged) {
      this.suppressedValue = null;
      return;
    }

    const changeSeq = ++this.valueChangeSeq;

    const inputValue = String($event.value ?? '');
    this.value = inputValue;

    await this.longOperation(3000);

    // If another onValueChanged happened while we awaited, abort this stale continuation.
    if (changeSeq !== this.valueChangeSeq) {
      return;
    }

    const updated = `${inputValue} (LONG OP EDIT)`;
    this.value = updated;

    this.setValueProgrammatically(updated);
  }

  asyncValidation = async (params: ValidationCallbackData): Promise<boolean> => {
    const validationSeq = ++this.validationSeq;

    try {
      this.validationInProgress = true;
      const isValid = await this.validateAsync(params.value ?? '');
      // If another validation started while we awaited, ignore this stale continuation.
      if (validationSeq !== this.validationSeq) {
        return this.isValid;
      }

      this.isValid = isValid;
      return isValid;
    } finally {
      // Only the latest validation should be allowed to clear the "in progress" flag.
      if (validationSeq === this.validationSeq) {
        this.validationInProgress = false;
      }
    }
  };

  protected async longOperation(timeout: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }

  private suppressedValue: string | null = null;
  protected setValueProgrammatically(value: string) {
    // This needs to be first as the next line immediately triggers onValueChanged.
    this.suppressNextValueChanged = true;
    // Alternative 
    this.suppressedValue = value;
    this.textBox?.instance.option('value', value);
  }

  // Overridable hook: must resolve(true/false).
  // Current rule: invalid if the value contains 'a'.
  protected validateAsync(value: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(!value.includes('(LONG OP EDIT)'));
      }, 1000);
    });
  }
}

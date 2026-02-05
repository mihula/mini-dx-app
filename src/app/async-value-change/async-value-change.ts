import { Component } from '@angular/core';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import { DxTextBoxModule, DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-async-value-change',
  imports: [DxTextBoxModule],
  templateUrl: './async-value-change.html',
  styleUrl: './async-value-change.css',
})
export class AsyncValueChange {
  public value: string = '';

  async onValueChanged($event: ValueChangedEvent) {
    this.value = $event.value;
  }
}

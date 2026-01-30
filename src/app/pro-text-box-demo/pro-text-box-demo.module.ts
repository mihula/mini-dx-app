import { NgModule } from '@angular/core';
import { ProTextBoxDemoComponent } from './pro-text-box-demo.component';
import { ProTextBox } from './pro-text-box/pro-text-box';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ProTextBoxDemoComponent, ProTextBox],
})
export class ProTextBoxDemoModule {}

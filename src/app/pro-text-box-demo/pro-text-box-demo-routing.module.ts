import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProTextBoxDemoComponent } from './pro-text-box-demo.component';

const routes: Routes = [
  { path: '', component: ProTextBoxDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProTextBoxDemoRoutingModule {}

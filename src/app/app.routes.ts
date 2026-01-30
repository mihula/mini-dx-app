import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pro-text-box-demo',
    loadComponent: () => import('./pro-text-box-demo/pro-text-box-demo.component').then(m => m.ProTextBoxDemoComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

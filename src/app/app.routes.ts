import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pro-text-box-demo',
    loadComponent: () => import('./pro-text-box-demo/pro-text-box-demo.component').then(m => m.ProTextBoxDemoComponent)
  },
  {
    path: 'async-value-change',
    loadComponent: () => import('./async-value-change/async-value-change').then(m => m.AsyncValueChange)
  },
  {
    path: 'empty-demo',
    loadComponent: () => import('./empty-demo/empty-demo.component').then(m => m.EmptyDemoComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

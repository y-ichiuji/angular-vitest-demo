import { Routes } from '@angular/router';
import { DemoComponent } from './page/demo/demo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: DemoComponent },
];

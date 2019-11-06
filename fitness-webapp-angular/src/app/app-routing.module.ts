import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { BlankComponent } from './app-shell/blank/blank.component';

const routes: Routes = [
  { path: '', redirectTo: '/blank', pathMatch: 'full' },
  {
    path: 'blank',
    loadChildren: () => import('./app-shell/blank/blank.module').then(mod => mod.BlankModule)
  },
  {
    path: 'api/test', pathMatch: 'full',
    component: BlankComponent,
    canActivate: [AuthGuard],

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }


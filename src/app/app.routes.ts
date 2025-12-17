import {RouterModule, Routes} from '@angular/router';
import { HomeComponent} from './home-component/home-component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {LoginComponent} from './page/login/login.component';
import {ListContactsComponent} from './page/list-contacts/list-contacts.component';
import {NotFoundComponent} from './page/not-found/not-found.component';
import {AuthGuard} from './classes/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/list-contacts', pathMatch: 'full'},
      {path: 'list-contacts', component: ListContactsComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'notfound', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

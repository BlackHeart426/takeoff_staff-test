import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { ListContactsComponent } from './page/list-contacts/list-contacts.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import {AuthGuard} from './classes/auth.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './classes/auth.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuToolbarComponent} from './components/menu-toolbar/menu-toolbar.component';
import { SearchPipe } from './pipe/search.pipe';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ListContactsComponent,
    ContactComponent,
    NotFoundComponent,
    MenuToolbarComponent,
    SearchPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    INTERCEPTOR_PROVIDER,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

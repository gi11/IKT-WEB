import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptor } from'./auth.interceptor';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlankModule } from './app-shell/blank/blank.module';
import { NavBarComponent } from './app-shell/nav-bar/nav-bar.component';
import { FooterComponent } from './app-shell/footer/footer.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BlankModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,}],
  bootstrap: [AppComponent]
})
export class AppModule { }

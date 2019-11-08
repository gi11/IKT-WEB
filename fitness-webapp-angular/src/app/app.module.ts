import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AuthInterceptor } from'./auth.interceptor';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule,
  MatExpansionModule
} from "@angular/material";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { HomeComponent } from "./home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { WorkoutEditComponent } from "./workout/workout-edit/workout-edit.component";
import { WorkoutDetailsComponent } from "./workout/workout-details/workout-details.component";
import { LayoutComponent } from './layout/layout.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    WorkoutEditComponent,
    WorkoutListComponent,
    HomeComponent,
    WorkoutDetailsComponent,
    WorkoutEditComponent,
    WorkoutListComponent,
    LayoutComponent,
    UserFormComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    FormsModule,

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,}],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AuthInterceptor } from './auth.interceptor';

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
  MatDividerModule,
  MatGridListModule,
  MatRadioModule,
  MatDialogModule
} from "@angular/material";

import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { HomeComponent } from "./home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { WorkoutFormComponent } from "./workout/workout-form/workout-form.component";
import { WorkoutDetailsComponent } from "./workout/workout-details/workout-details.component";
import { LayoutComponent } from './layout/layout.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { ExerciseCreateComponent } from './exercise/exercise-create/exercise-create.component';
import { ExerciseAddButtonComponent } from './exercise/exercise-add-button/exercise-add-button.component';
import { ExerciseAddFormComponent } from './exercise/exercise-add-form/exercise-add-form.component';
import { DialogSuccessComponent } from './shared/dialog-success/dialog-success.component';
import { DialogErrorComponent } from './shared/dialog-error/dialog-error.component';
import { DialogConfirmComponent } from './shared/dialog-confirm/dialog-confirm.component';
import { WorkoutDeleteBtnComponent } from './workout/workout-delete-btn/workout-delete-btn.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    HomeComponent,
    WorkoutDetailsComponent,
    WorkoutListComponent,
    LayoutComponent,
    UserFormComponent,
    ProfileComponent,
    ExerciseListComponent,
    ExerciseCreateComponent,
    ExerciseAddButtonComponent,
    ExerciseAddFormComponent,
    DialogSuccessComponent,
    DialogErrorComponent,
    DialogConfirmComponent,
    WorkoutDeleteBtnComponent
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
    MatGridListModule,
    MatRadioModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogSuccessComponent,
    DialogErrorComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,}],
  bootstrap: [AppComponent]
})
export class AppModule {}

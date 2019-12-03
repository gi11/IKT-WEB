import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
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
  MatExpansionModule,
  MatGridListModule,
  MatRadioModule,
  MatDialogModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthInterceptor } from "./auth/auth.interceptor";

import { LayoutComponent } from "./layout/layout.component";
import { NavigationBarComponent } from "./layout/navigation-bar/navigation-bar.component";
import { HomeComponent } from "./home/home.component";

import { UserFormComponent } from "./user/user-form/user-form.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";
import { DialogSuccessComponent } from "./dialog/dialog-success/dialog-success.component";
import { DialogErrorComponent } from "./dialog/dialog-error/dialog-error.component";
import { DialogConfirmComponent } from "./dialog/dialog-confirm/dialog-confirm.component";
import { WorkoutFormComponent } from "./workout/workout-form/workout-form.component";
import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { WorkoutDetailsComponent } from "./workout/workout-details/workout-details.component";
import { ExerciseFormComponent } from "./exercise/exercise-form/exercise-form.component";
import { ExerciseListComponent } from "./exercise/exercise-list/exercise-list.component";
import { WorkoutActivityListComponent } from './workout-activity/workout-activity-list/workout-activity-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationBarComponent,
    UserFormComponent,
    UserProfileComponent,
    DialogSuccessComponent,
    DialogErrorComponent,
    DialogConfirmComponent,
    HomeComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutDetailsComponent,
    ExerciseFormComponent,
    ExerciseListComponent,
    WorkoutActivityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatToolbarModule,
    MatSidenavModule,
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
    MatExpansionModule,
    MatGridListModule,
    MatRadioModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogSuccessComponent,
    DialogErrorComponent,
    DialogConfirmComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

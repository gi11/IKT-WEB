import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { WorkoutDetailsComponent } from "./workout/workout-details/workout-details.component";
import { WorkoutFormComponent } from "./workout/workout-form/workout-form.component";
import { HomeComponent } from "./home/home.component";
import { UserFormComponent } from "./user/user-form/user-form.component";
import { ProfileComponent } from "./user/user-profile/user-profile.component";

const routes: Routes = [
  // -----------------
  // Home
  // -----------------
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    data: {
      title: "Home"
    }
  },
  // -----------------
  // Workout Programs
  // -----------------
  {
    // All Workout Programs
    path: "workouts",
    component: WorkoutListComponent,
    data: {
      title: "Workout Programs"
    }
  },
  { // Edit Workout Program
    path: "workouts/:workoutid/edit",
    canActivate: [AuthGuard],
    component: WorkoutFormComponent,
    data: {
      title: "Workouts Edit",
      isCreateForm: false
    }
  },
  { // Create New Workout Program
    path: "workouts/create",
    canActivate: [AuthGuard],
    component: WorkoutFormComponent,
    data: {
      title: "Workouts Create",
      isCreateForm: true
    }
  },
  { // View Workout Program Details
    path: "workouts/:workoutid",
    component: WorkoutDetailsComponent,
    data: {
      title: "Workouts Details"
    }
  },
  // -----------------
  // User Account
  // -----------------
  {
    path: "profile",
    pathMatch: "full",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', pathMatch: 'full',
    component: UserFormComponent,
    data: {
      type: "login"
    }
  },
  {
    path: 'register', pathMatch: 'full',
    component: UserFormComponent,
    data: {
      type: "register"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

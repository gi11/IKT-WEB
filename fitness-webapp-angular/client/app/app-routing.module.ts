import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

import { HomeComponent } from "./home/home.component";
import { UserFormComponent } from "./user/user-form/user-form.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";

import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { WorkoutDetailsComponent } from "./workout/workout-details/workout-details.component";
import { WorkoutFormComponent } from "./workout/workout-form/workout-form.component";

import { ExerciseFormComponent } from "./exercise/exercise-form/exercise-form.component";

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
  // User Account
  // -----------------
  {
    path: "users/:userid/workouts",
    component: WorkoutListComponent,
    canActivate: [AuthGuard],
    data: {
      title: "My Workout Programs",
      filter: "user"
    }
  },
  {
    path: "users/:userid/profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    pathMatch: "full",
    component: UserFormComponent,
    data: {
      type: "login"
    }
  },
  {
    path: "register",
    pathMatch: "full",
    component: UserFormComponent,
    data: {
      type: "register"
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
      title: "Workout Programs",
      filter: "all"
    }
  },
  {
    // Edit Workout Program
    path: "workouts/:workoutid/edit",
    canActivate: [AuthGuard],
    component: WorkoutFormComponent,
    data: {
      title: "Workouts Edit",
      isCreateForm: false
    }
  },
  {
    // Create New Workout Program
    path: "workouts/create",
    canActivate: [AuthGuard],
    component: WorkoutFormComponent,
    data: {
      title: "Workouts Create",
      isCreateForm: true
    }
  },
  {
    // View Workout Program Details
    path: "workouts/:workoutid",
    component: WorkoutDetailsComponent,
    data: {
      title: "Workouts Details"
    }
  },
  // -----------------
  // Exercises
  // -----------------
  {
    // Edit Workout Program
    path: "workouts/:workoutid/exercises/:exerciseid/edit",
    canActivate: [AuthGuard],
    component: ExerciseFormComponent,
    data: {
      title: "Exercise Edit",
      isCreateForm: false
    }
  },
  {
    // Create New Workout Program
    path: "workouts/:workoutid/exercises/create",
    canActivate: [AuthGuard],
    component: ExerciseFormComponent,
    data: {
      title: "Exercise Create",
      isCreateForm: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

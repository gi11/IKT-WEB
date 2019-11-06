import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { BlankComponent } from './app-shell/blank/blank.component';

import { WorkoutListComponent } from "./workout/workout-list/workout-list.component";
import { WorkoutDetailsComponent } from "./workout/workout-details/workout-details.component";
import { HomeComponent } from "./home/home.component";
const routes: Routes = [
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
  {
    path: "workouts",
    // canActivate: [AuthGuard],
    component: WorkoutListComponent,
    data: {
      title: "Workout Programs"
    }
  },
  {
    path: 'workouts/:workoutid',
    // canActivate: [AuthGuard],
    component: WorkoutDetailsComponent,
    data: {
      title: "Workouts Details"
    }
  },
  {
    path: 'api/test', pathMatch: 'full',
    component: BlankComponent,
    canActivate: [AuthGuard],

  }
  // {
  //   path: "blank",
  //   loadChildren: () =>
  //     import("./app-shell/blank/blank.module").then(mod => mod.BlankModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

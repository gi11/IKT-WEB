import { Component, OnInit } from "@angular/core";
import { Workout } from "../workout";
import { User } from "../../user/user";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { WorkoutService } from "../workout.service";

@Component({
  selector: "fitapp-workout-list",
  templateUrl: "./workout-list.component.html",
  styles: []
})
export class WorkoutListComponent implements OnInit {
  filter: string;
  workouts: Workout[] = [];
  user: User;

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userid_param = this.route.snapshot.paramMap.get("userid");
    this.user = this.authService.getCurrentUser();
    this.route.data.subscribe(data => {
      this.filter = data.filter;
      if (this.filter == "user") {
        this.workoutService.getAllWorkoutsByUser(userid_param).subscribe(wos => {
          console.log(wos);
          this.workouts = wos;
        });
      } else {
        this.workoutService.getAllWorkouts().subscribe(wos => {
          console.log(wos);
          this.workouts = wos;
        });
      }
    });
  }

  delete(id: string){
    this.workoutService.deleteWorkout(id);
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Workout } from "../workout";
import { WorkoutService } from "../workout.service";
import { User } from "../../user/user"

@Component({
  selector: "fitapp-workout-details",
  templateUrl: "./workout-details.component.html",
  styles: [
    `
      .icon {
        padding: 0 14px;
      }
      .spacer {
        flex: 1 1 auto;
      }
      .create-btn {
        margin: 50px;
      }
    `
  ]
})
export class WorkoutDetailsComponent implements OnInit {
  @Input() workout: Workout;
  user: User;

  constructor(private authService: AuthService, private workoutService: WorkoutService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    const id = this.route.snapshot.paramMap.get("workoutid");
    console.log("id = " + id);
    this.workoutService.getWorkoutById(id).subscribe(workout => {
      this.workout = workout;
      console.log(workout);
    });
  }

  deleteWorkout(){
    this.workoutService.deleteWorkout(this.workout._id);
  }
}

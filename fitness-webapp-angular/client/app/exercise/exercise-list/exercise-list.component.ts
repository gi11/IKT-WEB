import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Exercise } from "../exercise";
import { ExerciseService } from "../exercise.service";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../user/user";
import { WorkoutActivityService } from "../../workout-activity/workout-activity.service";
import { WorkoutActivity } from "client/app/workout-activity/workout-activity";

@Component({
  selector: "fitapp-exercise-list",
  templateUrl: "./exercise-list.component.html",
  styles: [
    `
      table {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        min-width: 500px;
      }

      th.mat-header-cell {
        text-align: left;
        max-width: 300px;
      }
    `
  ]
})
export class ExerciseListComponent implements OnInit {
  @Input() exercises: Exercise[] = [];
  @Input() parentWorkoutId: string;
  @Input() parentWorkoutUserId: string;
  user: User;

  displayedColumns: string[] = [
    "name",
    "description",
    "set",
    "repeat_count",
    "repeat_type"
  ];

  constructor(
    private router: Router,
    private exerciseService: ExerciseService,
    private workoutActivityService: WorkoutActivityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.displayedColumns.push("log");
      if (this.user._id == this.parentWorkoutUserId) {
        this.displayedColumns.push("edit", "delete");
      }
    }
  }

  editExercise(id: string) {
    this.router.navigate([
      "workouts/" + this.parentWorkoutId + "/exercises/" + id + "/edit"
    ]);
  }

  deleteExercise(id: string) {
    this.exerciseService.deleteExercise(this.parentWorkoutId, id);
  }

  logExercise(exerciseid: string) {
    let newActivity = new WorkoutActivity();
    let exercise = this.exercises.find(e => e._id == exerciseid);
    newActivity._exerciseId = exerciseid;
    newActivity._workoutId = this.parentWorkoutId;
    newActivity.exerciseName = exercise.name;
    newActivity._userId = this.user._id;
    newActivity.username = this.user.username;
    console.log(newActivity);
    this.workoutActivityService
      .createWorkoutActivity(newActivity)
      .subscribe(res => window.location.reload());
  }
}

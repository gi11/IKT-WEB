import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DialogConfirmComponent } from "../dialog/dialog-confirm/dialog-confirm.component";
import { ApiService } from "../api/api.service";
import { Workout } from "./workout";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class WorkoutService {
  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {}

  deleteDialogConfig = {
    height: "200px",
    width: "400px",
    disableClose: true,
    data: {}
  };
  deleteWorkout(workoutid: string) {
    this.deleteDialogConfig.data = {
      title: "Confirm Delete",
      message: "Are you sure you want to delete this workout?"
    };
    const dialogRef = this.dialog.open(
      DialogConfirmComponent,
      this.deleteDialogConfig
    );
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log("Delete Confirmed");
        this.apiService.deleteWorkout(workoutid).subscribe(res => {
          console.log("Delete completed");
          this.router.navigate(['/workouts']);
        });
      } else {
        console.log("Delete Cancelled");
      }
    });
  }

  getWorkoutById(id: string){
    return this.apiService.getWorkoutById(id);
  }

  getAllWorkouts(){
    return this.apiService.getWorkouts();
  }

  getAllWorkoutsByUser(id: string){
    return this.apiService.getWorkouts(id);
  }

  editWorkout(workout: Workout){
    return this.apiService.updateWorkout(workout);
  }

  createWorkout(workout: Workout){
    return this.apiService.createWorkout(workout);
  }
}

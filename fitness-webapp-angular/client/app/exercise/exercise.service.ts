import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material";
import { DialogConfirmComponent } from "../dialog/dialog-confirm/dialog-confirm.component";
import { ApiService } from "../api/api.service";
import { Exercise } from "./exercise";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {}

  deleteDialogConfig = {
    height: "200px",
    width: "400px",
    disableClose: true,
    data: {}
  };

  deleteExercise(workoutid: string, exerciseid: string) {
    this.deleteDialogConfig.data = {
      title: "Confirm Delete",
      message: "Are you sure you want to delete this exercise?"
    };
    const dialogRef = this.dialog.open(
      DialogConfirmComponent,
      this.deleteDialogConfig
    );
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log("Delete Confirmed");
        this.apiService.deleteExercise(workoutid, exerciseid).subscribe(res => {
          console.log("Delete completed");
          // this.router.navigate(['/workouts/' + workoutid]);
          window.location.reload();
        });
      } else {
        console.log("Delete Cancelled");
      }
    });
  }

  editExercise(workoutid: string, exercise: Exercise){
    return this.apiService.updateExercise(workoutid, exercise);
  }

  createExercise(workoutid: string, exercise: Exercise){
    return this.apiService.createExercise(workoutid, exercise);
  }
}

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ExerciseAddFormComponent } from "../exercise-add-form/exercise-add-form.component";

@Component({
  selector: "fitapp-exercise-add-button",
  templateUrl: "./exercise-add-button.component.html",
  styleUrls: ["./exercise-add-button.component.css"]
})
export class ExerciseAddButtonComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ExerciseAddFormComponent, {
      width: "640px",
      disableClose: true
    });
  }
}

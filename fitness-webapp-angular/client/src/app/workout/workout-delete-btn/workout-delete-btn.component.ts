import { Component, OnInit } from "@angular/core";

@Component({
  selector: "fitapp-workout-delete-btn",
  templateUrl: "./workout-delete-btn.component.html",
  styles: []
})
export class WorkoutDeleteBtnComponent implements OnInit {
  private dialogConfig;
  constructor() {}

  ngOnInit() {
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };
  }
}

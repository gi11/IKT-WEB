import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../api/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Workout } from "../workout";
import { AuthenticationService } from "../../auth/authentication.service";
import { MatDialog } from "@angular/material";
import { Location } from "@angular/common";
import { DialogSuccessComponent } from "../../shared/dialog-success/dialog-success.component";
import { DialogErrorComponent } from "../../shared/dialog-error/dialog-error.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "fitapp-workout-form",
  templateUrl: "./workout-form.component.html",
  styles: [
    `
      mat-form-field {
        width: 400px;
      }
    `
  ]
})
export class WorkoutFormComponent implements OnInit {
  formModel: FormGroup;
  workoutModel: Workout;
  parentUserId: string;

  title: string;
  submitBtnText: string;

  private dialogConfig;
  @Input() isCreateForm: boolean;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isCreateForm = data.isCreateForm;
      if (this.isCreateForm) {
        this.title = "Create new Workout";
        this.submitBtnText = "Create Workout";
      } else {
        this.title = "Edit Workout";
        this.submitBtnText = "Apply Changes";
      }
    });
    this.parentUserId = this.authService.getCurrentUser()._id;
    this.initializeForm();
    if (!this.isCreateForm) {
      const id = this.route.snapshot.paramMap.get("workoutid");
      console.log("id = " + id);
      this.apiService.getWorkoutById(id).subscribe(workout => {
        this.workoutModel = workout;
        this.formModel.setValue({
          name: this.workoutModel.name,
          description: this.workoutModel.description
        });
      });
    }
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };
  }

  initializeForm() {
    this.workoutModel = new Workout();
    this.workoutModel.name = "Default Name";
    this.workoutModel.description = "Default Description";
    this.formModel = new FormGroup({
      name: new FormControl(this.workoutModel.name, [Validators.required]),
      description: new FormControl(this.workoutModel.description)
    });
  }

  onSubmit() {
    console.log("Submitting form");
    if (!this.isCreateForm) {
      this.submitUpdate();
    } else {
      this.submitCreate();
    }
  }

  submitCreate() {
    const newWorkout: Workout = this.formModel.value as Workout;
    newWorkout._userId = this.parentUserId;
    console.log(newWorkout);
    this.apiService.createWorkout(newWorkout).subscribe(
      res => {
        this.greatSuccess("Workout Created Succesfully!");
      },
      error => {
        this.notGreatSuccess();
      }
    );
  }

  submitUpdate() {
    const updatedWorkout: Workout = this.formModel.value as Workout;
    updatedWorkout._id = this.workoutModel._id;
    console.log(updatedWorkout);
    this.apiService.updateWorkout(updatedWorkout).subscribe(
      res => {
        this.greatSuccess("Workout Updated Succesfully!");
      },
      error => {
        this.notGreatSuccess();
      }
    );
  }

  greatSuccess(greatSuccessMessage) {
    this.dialogConfig.data = {
      title: "Great Success!",
      message: greatSuccessMessage
    };
    const dialogRef = this.dialog.open(DialogSuccessComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.location.back();
    });
  }

  notGreatSuccess() {
    this.dialogConfig.data = {
      title: "Error",
      message: "Something went wrong"
    };
    const dialogRef = this.dialog.open(DialogErrorComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.location.back();
    });
  }

  onCancel() {
    this.location.back();
  }
}

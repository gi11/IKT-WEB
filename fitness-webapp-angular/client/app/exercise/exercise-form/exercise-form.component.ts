import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../api/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Exercise } from "../exercise";
import { Workout } from "../../workout/workout";
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from "@angular/material";
import { Location } from "@angular/common";
import { DialogSuccessComponent } from "../../dialog/dialog-success/dialog-success.component";
import { DialogErrorComponent } from "../../dialog/dialog-error/dialog-error.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "fitapp-exercise-form",
  templateUrl: "./exercise-form.component.html",
  styles: [
    `
      mat-form-field {
        width: 400px;
      }
    `
  ]
})
export class ExerciseFormComponent implements OnInit {
  formModel: FormGroup;
  exerciseModel: Exercise;
  parentUserId: string;
  parentWorkoutId: string;

  title: string;
  submitBtnText: string;

  private dialogConfig;
  @Input() isCreateForm: boolean;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isCreateForm = data.isCreateForm;
      if (this.isCreateForm) {
        this.title = "Create new Exercise";
        this.submitBtnText = "Create Exercise";
      } else {
        this.title = "Edit Exercise";
        this.submitBtnText = "Apply Changes";
      }
    });
    this.parentUserId = this.authService.getCurrentUser()._id;
    this.initializeForm();
    this.parentWorkoutId = this.route.snapshot.paramMap.get("workoutid");
    if (!this.isCreateForm) {
      const exerciseid = this.route.snapshot.paramMap.get("exerciseid");
      this.apiService
        .getWorkoutById(this.parentWorkoutId)
        .subscribe(workout => {
          this.exerciseModel = workout.exercises.find(
            e => (e._id = exerciseid)
          );
          console.log(this.exerciseModel);
          this.formModel.setValue({
            name: this.exerciseModel.name,
            description: this.exerciseModel.description,
            set: this.exerciseModel.set,
            repeat_type: this.exerciseModel.repeat_type,
            repeat_count: this.exerciseModel.repeat_count
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
    this.exerciseModel = new Exercise();
    this.exerciseModel.name = "Default Name";
    this.exerciseModel.description = "Default Description";
    this.exerciseModel.set = 1;
    this.exerciseModel.repeat_count = 1;
    this.exerciseModel.repeat_type = "times";
    this.formModel = new FormGroup({
      name: new FormControl(this.exerciseModel.name, [Validators.required]),
      description: new FormControl(this.exerciseModel.description),
      set: new FormControl(this.exerciseModel.set),
      repeat_count: new FormControl(this.exerciseModel.repeat_count),
      repeat_type: new FormControl(this.exerciseModel.repeat_type)
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
    const newExercise: Exercise = this.formModel.value as Exercise;
    console.log(newExercise);
    this.apiService.createExercise(this.parentWorkoutId, newExercise).subscribe(
      res => {
        this.greatSuccess("Exercise Created Succesfully!");
      },
      error => {
        this.notGreatSuccess();
      }
    );
  }

  submitUpdate() {
    const updatedExercise: Exercise = this.formModel.value as Exercise;
    updatedExercise._id = this.exerciseModel._id;
    console.log(this.formModel.value);
    console.log(updatedExercise);
    this.apiService
      .updateExercise(this.parentWorkoutId, updatedExercise)
      .subscribe(
        res => {
          this.greatSuccess("Exercise Updated Succesfully!");
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
    const dialogRef = this.dialog.open(
      DialogSuccessComponent,
      this.dialogConfig
    );
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

import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../api/api.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "fitapp-exercise-add-form",
  templateUrl: "./exercise-add-form.component.html",
  styleUrls: ["./exercise-add-form.component.css"]
})

export class ExerciseAddFormComponent implements OnInit {
  formModel: FormGroup;
  @Input() parentWorkoutId: string;
  constructor(private apiService: ApiService) {
    this.formModel = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      set: new FormControl(""),
      repeatCount: new FormControl(""),
      repeatType: new FormControl("")
    });
  }

  onSubmit() {
    this.apiService.createExercise(this.parentWorkoutId, this.formModel.value)
    console.log(this.formModel.value);
  }

  ngOnInit() {

  }
}

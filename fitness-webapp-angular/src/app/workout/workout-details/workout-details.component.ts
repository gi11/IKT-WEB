import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Workout } from "../workout";
import { ApiService } from '../../api.service';

@Component({
  selector: "fitapp-workout-details",
  templateUrl: "./workout-details.component.html",
  styles: [
    ".icon {padding: 0 14px;} .spacer {flex: 1 1 auto;}"
  ]
})
export class WorkoutDetailsComponent implements OnInit {
  workout: Workout;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("workoutid");
    this.apiService.getWorkoutById(id)
      .subscribe((data: any) => {
        this.workout = data;
        // this.workout.id = data._id;
        console.log(this.workout);
      })
    ;
  }
}

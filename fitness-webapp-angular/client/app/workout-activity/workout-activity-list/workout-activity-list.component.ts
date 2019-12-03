import { Component, OnInit, Input} from '@angular/core';
import { WorkoutActivity } from "../workout-activity";
import { WorkoutActivityService } from "../workout-activity.service"

@Component({
  selector: 'fitapp-workout-activity-list',
  templateUrl: './workout-activity-list.component.html',
  styles: []
})
export class WorkoutActivityListComponent implements OnInit {
  workoutActivities: WorkoutActivity[] = [];
  @Input() workoutid;
  constructor(private workoutActivityService: WorkoutActivityService) { }

  ngOnInit() {
    this.workoutActivityService.getWorkoutActivity(this.workoutid).subscribe(wacs => {
      console.log(wacs);
      this.workoutActivities = wacs;
    });
  }

}

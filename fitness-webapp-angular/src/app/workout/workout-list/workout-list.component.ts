import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Workout } from '../workout';

@Component({
  selector: 'fitapp-workout-list',
  templateUrl: './workout-list.component.html',
  styles: []
})
export class WorkoutListComponent implements OnInit {

  workouts: Workout[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getWorkouts()
      .subscribe((data) => {
        console.log(data);
        this.workouts = data;
        // this.apiService.getWorkouts().subscribe((res)=>{
        //   console.log(res);
        // });
      });
  }


}

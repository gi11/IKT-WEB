import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { WorkoutActivity } from "./workout-activity";

@Injectable({
  providedIn: 'root'
})
export class WorkoutActivityService {

  constructor(private apiService: ApiService) { }

  getWorkoutActivity(workoutid: string){
    return this.apiService.getWorkoutActivity(workoutid);
  }

  createWorkoutActivity(activity: WorkoutActivity){
    return this.apiService.createWorkoutActivity(activity);
  }
}
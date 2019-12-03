import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { Workout } from "../workout/workout";
import { Exercise } from "../exercise/exercise";
import { environment } from "../../environments/environment";
import { WorkoutActivity } from '../workout-activity/workout-activity';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiURL: string;

  constructor(private httpClient: HttpClient) {
    if (environment.production) {
      this.apiURL = "/api";
    } else {
      this.apiURL = "/api";
    }
  }

  // Workout
  public createWorkout(workout: Workout) {
    return this.httpClient
      .post<Workout>(`${this.apiURL}/workouts/`, workout)
      .pipe(
        tap(_ => console.log("Creating workout", workout)),
        catchError(this.handleError<Workout>("Error: createWorkout"))
      );
  }

  public updateWorkout(workout: Workout) {
    return this.httpClient
      .put(`${this.apiURL}/workouts/${workout._id}`, workout)
      .pipe(
        tap(_ => console.log("Updating workout", workout)),
        catchError(this.handleError<Workout>("Error: updateWorkout"))
      );
  }

  public deleteWorkout(id: string) {
    return this.httpClient
      .delete<Workout>(`${this.apiURL}/workouts/${id}`)
      .pipe(
        tap(_ => console.log("Deleting workout with id = " + id)),
        catchError(this.handleError<Workout>("Error: updateWorkout"))
      );
  }

  public getWorkoutById(id: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.apiURL}/workouts/${id}`).pipe(
      tap(_ => console.log(`Fetched workout by id = ${id}`)),
      catchError(this.handleError<Workout>(`Error: getWorkoutById id = ${id}`))
    );
  }

  public getWorkouts(userid?: string): Observable<Workout[]> {
    if (userid) {
      return this.httpClient
        .get<Workout[]>(`${this.apiURL}/workouts?userid=${userid}`)
        .pipe(
          tap(_ => console.log("Fetched Workouts by user with id = " + userid)),
          catchError(this.handleError<Workout[]>("Error: getWorkouts"))
        );
    } else {
      return this.httpClient.get<Workout[]>(`${this.apiURL}/workouts`).pipe(
        tap(_ => console.log("Fetched all Workouts")),
        catchError(this.handleError<Workout[]>("Error: getWorkouts"))
      );
    }
  }

  // Exercise
  public createExercise(parentId: string, exercise: Exercise) {
    return this.httpClient
      .post<Exercise>(`${this.apiURL}/workouts/${parentId}/exercises`, exercise)
      .pipe(
        tap(_ =>
          console.log("Created exercise in workout with id = " + parentId)
        ),
        catchError(this.handleError<Exercise>("Error: createExercise"))
      );
  }

  public updateExercise(parentId: string, exercise: Exercise) {
    return this.httpClient
      .put(
        `${this.apiURL}/workouts/${parentId}/exercises/${exercise._id}`,
        exercise
      )
      .pipe(
        tap(_ =>
          console.log("Updated exercise in workout with id = " + parentId)
        ),
        catchError(this.handleError<Exercise>("Error: updateExercise"))
      );
  }

  public deleteExercise(parentId: string, exerciseId: string) {
    return this.httpClient
      .delete<Exercise>(
        `${this.apiURL}/workouts/${parentId}/exercises/${exerciseId}`
      )
      .pipe(
        tap(_ =>
          console.log(
            "Deleted exercise  with id = " +
              exerciseId +
              "in workout with id = " +
              parentId
          )
        ),
        catchError(this.handleError<Exercise>("Error: deleteExercise"))
      );
  }

  public getWorkoutActivity(workoutid: string): Observable<WorkoutActivity[]> {
    if (workoutid) {
      return this.httpClient
        .get<WorkoutActivity[]>(`${this.apiURL}/workoutactivities?workoutid=${workoutid}`)
        .pipe(
          tap(_ => console.log("Fetched workout activities by workout with id = " + workoutid)),
          catchError(this.handleError<WorkoutActivity[]>("Error: getWorkoutActivity"))
        );
    } else {
      //
    }
  }

    // Exercise
    public createWorkoutActivity(workoutActivity: WorkoutActivity) {
      return this.httpClient
        .post<WorkoutActivity>(`${this.apiURL}/workoutactivities`, workoutActivity)
        .pipe(
          tap(_ =>
            console.log("Created workout activity")
          ),
          catchError(this.handleError<WorkoutActivity>("Error: createWorkoutActivity"))
        );
    }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}

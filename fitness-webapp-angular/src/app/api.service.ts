import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Workout } from "./workout/workout";
import { Exercise } from "./exercise";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiURL = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) {}

  public createWorkout(workout: Workout) {
    return this.httpClient.post<Workout>(`${this.apiURL}/workouts/`, workout);
  }

  public updateWorkout(workout: Workout) {
    return this.httpClient.put(`${this.apiURL}/workouts/${workout.id}`, workout);
  }

  public deleteWorkout(id: string) {
    return this.httpClient.delete<Workout>(`${this.apiURL}/workouts/${id}`);
  }

  public getWorkoutById(id: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.apiURL}/workouts/${id}`)
      .pipe(
        tap(_ => console.log(`fetched workout by id=${id}`)),
        catchError(this.handleError<Workout>(`getWorkoutById id=${id}`))
      );
    // return this.httpClient.get<Workout>(`${this.apiURL}/workouts/${id}`);
  }

  public getWorkouts(userid?: string): Observable<Workout[]> {
    if (userid) {
      return this.httpClient.get<Workout[]>(`${this.apiURL}/workouts?userid=${userid}`);
    } else {
      return this.httpClient.get<Workout[]>(`${this.apiURL}/workouts`)
        .pipe(
          tap(_ => console.log('fetched Workouts')),
          catchError(this.handleError('getWorkouts', []))
        );
      // return this.httpClient.get<Workout[]>(`${this.apiURL}/workouts`);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}

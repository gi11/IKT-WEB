import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(apiUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched Posts')),
  //       catchError(this.handleError('getPosts', []))
  //     );
  // }
}

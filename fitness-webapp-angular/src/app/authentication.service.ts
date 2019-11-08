import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {AuthResponse} from './auth-response';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

    isLoggedIn = false;
    @Output () change: EventEmitter<boolean> = new EventEmitter();  

    constructor(private http: HttpClient, private router: Router) { }
    private baseUrl = 'http://localhost:3000';
    redirectUrl = this.baseUrl;

    public register(user: User){
        const url = `${this.baseUrl}/api/register`;
        this.http.post<AuthResponse>(url, user).subscribe(data => {
            this.saveToken(data.token);
            this.router.navigate(['/api/login']);
        },
        // Errors will call this callback instead:
        (err: HttpErrorResponse) =>{
            if(err.error instanceof Error) {
                // A client-side or netwoek error occured. Handle it accordingly.
                console.log('An error occurred', err.error.message);
            } else {
                //The backend return an unsuccessful response code.
                //The response body may contain clue as to what went wrong,
                console.log(`Back end returned code ${err.status} body was: ${err.error}`);
            }
        return false;
        });
    }

    public login(user: User){
        const url = `${this.baseUrl}/api/login`;
        this.http.post<AuthResponse>(url, user).subscribe(data => {
            this.saveToken(data.token);
            console.log('This is the token in localstorage: ');
            console.log(this.getToken());
            this.isLoggedIn = true;
            this.change.emit(this.isLoggedIn);
            this.router.navigate([''])
            return true;
        },
        // Errors will call this callback instead:
        (err: HttpErrorResponse) =>{
            if(err.error instanceof Error) {
                // A client-side or netwoek error occured. Handle it accordingly.
                console.log('An error occurred', err.error.message);
            } else {
                //The backend return an unsuccessful response code.
                //The response body may contain clue as to what went wrong,
                console.log(`Back end returned code ${err.status} body was: ${err.error}`);
            }
        return false;
        });
    }

    public logout(){
        const token = this.getToken();
        if(token){
            window.localStorage.removeItem('fitness-user-token');
            this.isLoggedIn = false;
            this.change.emit(this.isLoggedIn);
            this.router.navigate(['']);
        }

    }

    public checkIsLoggedIn(){
        const token = this.getToken();
        if(token){
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        }else {
            return false;
        }
    }

    public getCurrentUser(): User {
        if(this.checkIsLoggedIn()) {
            const token = this.getToken();
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            const user = new User();
            user._id = payload._id;
            user.username = payload.username;
            return user;
        }else{
            return;
        }
    }

    private saveToken(token: string){
        window.localStorage['fitness-user-token'] = token;
    }

    public getToken() {
        if (window.localStorage['fitness-user-token']){
            return window.localStorage['fitness-user-token'];
        } else{
            return '';
        }
    }
}


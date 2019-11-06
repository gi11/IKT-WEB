import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {AuthResponse} from './auth-response';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:3000';

    public register(user: User){
        const url = `${this.baseUrl}/api/register`;
        this.http.post<AuthResponse>(url, user).subscribe(data => {
            this.saveToken(data.token);
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

        // public register(user: User) {
        //     const url = `${this.baseUrl}/createUser`;
        //     this.http.post(url, user).subscribe((data) => {
        //         this.saveToken(data.token);
        //         this.router.navigate(['/']);

        //         return true;
        //     }, 
        //     (err: HttpErrorResponse) =>{
        //         if(err.error instanceof Error) {
        //             // A client-side or netwoek error occured. Handle it accordingly.
        //             console.log('An error occurred', err.error.message);
        //         } else {
        //             //The backend return an unsuccessful response code.
        //             //The response body may contain clue as to what went wrong,
        //             console.log(`Back end returned code ${err.status} body was: ${err.error}`);
        //         }
        //     }
        // }

    public login(user: User){
        const url = `${this.baseUrl}/api/login`;
        this.http.post<AuthResponse>(url, user).subscribe(data => {
            this.saveToken(data.token);
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

    public logout(){''
        const token = this.getToken();
        if(token){
            window.localStorage.removeItem('fitness-user-token');
        } 
    }

    public isLoggedIn(){
        const token = this.getToken();
        if(token){
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        }else {
            return false;
        }
    }

    public currentUser(): User {
        if(this.isLoggedIn()) {
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

    private getToken() {
        if (window.localStorage['fitness-user-token']){
            return window.localStorage['fitness-user-token'];
        } else{
            return '';
        }
    }
}


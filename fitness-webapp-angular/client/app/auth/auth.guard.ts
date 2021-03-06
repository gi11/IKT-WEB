import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    console.log("authGuard called");
    if (this.authService.checkIsLoggedIn()) {
      console.log("authGuard: user is authenticated");
      console.log(this.authService.getCurrentUser());
      return true;
    } // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    console.log("authGuard: user is not authenticated");
    // Navigate to the login page
    this.router.navigate(["/login"]);
    return false;
  }
}

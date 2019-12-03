import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../user/user";

@Component({
  selector: "fitapp-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styles: [
    `
      .displayBlock {
        display: block;
      }
      .menu-spacer {flex: 1 1 auto;}
    `
  ]
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn: boolean;
  user: User = null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.isLoggedIn = false;
    this.isLoggedIn = this.authService.checkIsLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.authService.getCurrentUser();
    }
    this.authService.change.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.user = this.authService.getCurrentUser();
    });
    
  }

  onLogout() {
    this.authService.logout();
  }
}

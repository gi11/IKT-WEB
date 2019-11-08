import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../auth/authentication.service'
import {User} from '../../user/user'

@Component({
  selector: 'fitapp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn: boolean 
  user: User = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthenticationService) { 
    
  }

  ngOnInit() {
    this.isLoggedIn = false;
    this.authService.change.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
      this.user = this.authService.getCurrentUser(); 
    });
  }

  onLogout(){
    this.authService.logout()
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
@Component({
  selector: 'fitapp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  onLogin(){
    
  }

  onLogout(){
    this.authService.logout()
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}

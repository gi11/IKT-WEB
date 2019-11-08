import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import { User } from '../user'

@Component({
  selector: 'fitapp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user = new User();
  constructor(private authService: AuthenticationService) { 
  }


  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

}

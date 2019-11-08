import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../auth/authentication.service";
import { User } from "../user";

@Component({
  selector: "fitapp-user-profile",
  templateUrl: "./user-profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  private user = new User();
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { User } from "../user";

@Component({
  selector: "fitapp-user-profile",
  templateUrl: "./user-profile.component.html",
  styles: []
})
export class UserProfileComponent implements OnInit {
  user = new User();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { DialogErrorComponent } from "../../dialog/dialog-error/dialog-error.component";
import { DialogSuccessComponent } from "../../dialog/dialog-success/dialog-success.component";
import { MatDialog } from "@angular/material";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "fitapp-user-form",
  templateUrl: "./user-form.component.html",
  styles: [
    `
      mat-form-field {
        width: 200px;
        margin: 0 40px 0 40px;
      }
    `
  ]
})
export class UserFormComponent implements OnInit {
  userFormModel: FormGroup;
  type: string;
  title: string;
  private dialogConfig;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.userFormModel = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    switch (this.type) {
      case "register":
        this.authService.register(
          this.userFormModel.value,
          res => this.registerSuccess(),
          err => this.registerFailure(err)
        );
        break;
      case "login":
        this.authService.login(
          this.userFormModel.value,
          res => this.loginSuccess(),
          err => this.loginFailure(err)
        );
        break;
    }
  }

  loginSuccess(arg?) {
    this.dialogConfig.data = {
      title: "Success",
      message: "You are now logged in"
    };
    const dialogRef = this.dialog.open(
      DialogSuccessComponent,
      this.dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      // this.location.back();
      this.router.navigateByUrl(this.authService.redirectUrl);
    });
  }

  loginFailure(err?: HttpErrorResponse) {
    let errormessage = "Something went wrong";
    switch (err.error.message) {
      case "incorrect username":
        errormessage = "Incorrect username - Try again";
        break;
      case "incorrect password":
        errormessage = "Incorrect password - Try again";
        break;
      default:
        break;
    }
    this.dialogConfig.data = {
      title: "Login Failed",
      message: errormessage
    };
    const dialogRef = this.dialog.open(DialogErrorComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.location.back();
    });
  }

  registerSuccess() {
    this.dialogConfig.data = {
      title: "Success",
      message:
        "You have succesfully registered, and you can now login to your account"
    };
    const dialogRef = this.dialog.open(
      DialogSuccessComponent,
      this.dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/login"]);
    });
  }

  registerFailure(err?) {
    this.dialogConfig.data = {
      title: "Registration Failed",
      message: "Please try again with a different username"
    };
    const dialogRef = this.dialog.open(DialogErrorComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // this.location.back();
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.type = data.type;
      this.title = this.type.charAt(0).toUpperCase() + this.type.substring(1);
    });
    this.dialogConfig = {
      height: "300px",
      width: "500px",
      disableClose: true,
      data: {}
    };
  }
}

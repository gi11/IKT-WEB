import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [],
})
export class UserFormComponent implements OnInit {

    userFormModel : FormGroup;
    constructor( private authService: AuthenticationService) {
        this.userFormModel = new FormGroup({
            username: new FormControl('username', [Validators.required]),
            password: new FormControl('****'),
        });
     }
    
     onSubmit() {
        this.authService.login(this.userFormModel.value);
     }

     ngOnInit() {
    }
  
}
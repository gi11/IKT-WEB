import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service'


@Component({
  selector: 'fitapp-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [],
})
export class UserFormComponent implements OnInit {

    userFormModel : FormGroup;
    type : string;
    constructor( private authService: AuthenticationService,
        private activatedRoute: ActivatedRoute, private router: Router) {
        this.userFormModel = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }
     
    onSubmit() {
    switch (this.type) {
        case 'register': 
        this.authService.register(this.userFormModel.value);
            break;
        case 'login': 
        this.authService.login(this.userFormModel.value); 
            break;
    }
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.type = data.type;
        })
    }
}
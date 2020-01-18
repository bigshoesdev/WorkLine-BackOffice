import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service';
import { ToastService } from '../../service';

@Component({
  selector: 'ngx-auth-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(private router: Router, private fb: FormBuilder, private toastService: ToastService, public userService: UserService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  ngOnInit() {
  }

  doLogin(o) {
    if (this.form.valid) {
      this.userService.authenticateUser({
        email: this.email.value,
        password: this.password.value
      }).then(o => {
        if (o.success) {
          this.userService.setUser(o.user);
          this.userService.setIsLogin(true);
          this.userService.setToken(o.token);
          this.router.navigateByUrl("pages");
        } else {
          this.toastService.showErrorToast(o.message);
        }
      }, (error) => {
        this.toastService.showErrorToast(error.message);
      });
    }
  }
}

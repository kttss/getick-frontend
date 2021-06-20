import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/services/user.service';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  incorrect = false;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['kattouss.issam@gmail.com', [Validators.required, Validators.email]],
      password: ['123', Validators.required]
    });
  }

  onSubmit() {
    this.incorrect = false;
    const { email, password } = this.loginForm.value;
    this._userService.login({ email, password }).subscribe(
      (data: { [key: string]: string }) => {
        const { token } = data;
        this.tokenService.setToken(token);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.incorrect = true;
      }
    );
  }
}

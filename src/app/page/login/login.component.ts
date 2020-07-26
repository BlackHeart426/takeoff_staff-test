import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {User} from '../../interface';
import {MaterialService} from '../../service/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  submitted: boolean
  message = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params) {
        this.message = 'Please, log in'
      }
    })

    this.form = new FormGroup({
      email: new FormControl('root_admin@gmail.com', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('1q2w3e4r', [
        Validators.minLength(6),
        Validators.required
      ])
    })
  }


  submit() {
    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/'])
      MaterialService.toast(`Авторизация успешна`)
      this.submitted = false
    }, () => {
      this.submitted = true
    })
  }
}

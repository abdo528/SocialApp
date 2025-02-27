import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  login!: FormGroup
  ngOnInit(): void {
    this.formLogin()
  }
  formLogin(): void {
    this.login = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }
  signin(): void {
    if (this.login.valid) {
      this.userService.signIn(this.login.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('tokenSocailApp', res.token)
            this.router.navigate(['/timeline'])
          }
        }
      })
    } this.login.markAllAsTouched()
  }
}

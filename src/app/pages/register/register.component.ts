import { UserService } from './../../core/services/user/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  register!: FormGroup
  ngOnInit(): void {
    this.formRegister()
  }
  formRegister(): void {
    this.register = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
      rePassword: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    })
  }
  signup(): void {
    // if (this.register.valid) {
    this.userService.signUp(this.register.value).subscribe({
      next: (res) => {
        if (res.message = 'success') {
          this.router.navigate(['/timeline'])
        }
      }
    })
  }
  // else {
  // this.register.markAllAsTouched()
  // }
  // }
}

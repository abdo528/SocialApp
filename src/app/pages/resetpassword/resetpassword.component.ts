import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  private readonly userServicep = inject(UserService)
  private readonly router = inject(Router)
  resetPass!: FormGroup
  ngOnInit(): void {
    this.changePass()
  }
  changePass(): void {
    this.resetPass = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
    })
  }
  newPass(): void {
    this.userServicep.changePassword(this.resetPass.value).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          localStorage.setItem('tokenSocailApp', res.token)
          this.router.navigate(['/timeline'])
        }
      }
    })
  }
}

import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormControl, ValidationErrors, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  signUpForm = this.fb.group({
    email: ["",],
    password: ["",],
    confirmPassword: ["",],
    nickname: ["",],
    checkbox: ["", ],
    balance: 0,
    cardInfo:{},
    crypto:[],
  }, {
    validators: []
  });

  constructor(public fb: FormBuilder, public router: Router, private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  public editingIndex: number | null = null;


  public onSubmit(): void {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;
      this.http.post('http://localhost:3000/users', userData).subscribe((response) => {
        console.log('User data saved:', response);
      });
      this.signUpForm.reset();
    }
    this.router.navigate(['/login']);
  }



  public passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }



  public englishValidator(control: FormControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9]*$/;
    const value = control.value;
    if (!pattern.test(value)) {
      return { englishValidator: true };
    }
    return null;
  }



  public phoneNumberValidator(control: FormControl): ValidationErrors | null {
    const pattern = /^\+995\d{9}$/;
    const value = control.value;
    if (!pattern.test(value)) {
      return { phoneNumberFormat: true };
    }
    return null;
  }

  public websiteValidator(control: FormControl): ValidationErrors | null {
    const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
    const value = control.value;
    if (!pattern.test(value)) {
      return { websiteFormat: true };
    }
    return null;
  }


  public resetForm(): void {
    this.signUpForm.reset();
    this.editingIndex = null;
  }

}

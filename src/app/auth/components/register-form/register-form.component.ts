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
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegisterFormComponent implements OnInit {
  signUpForm = this.fb.group({
    email: ["",],
    password: ["",],
    nickname: ["",],
    phoneNumber: ["",],
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

 
  public resetForm(): void {
    this.signUpForm.reset();
    this.editingIndex = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  public register(): void {
    if (this.form.valid) {
      this.accountService.registerUser(this.form.value as Credential);
    }
  }
}

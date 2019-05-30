import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.maxDate = this.getMaximumDate();
  }

  onSubmit(signupNgForm: NgForm) {
    this.authService.registerUser({
      email: signupNgForm.value.email,
      password: signupNgForm.value.password
    });
  }

  private getMaximumDate(): Date {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18);
    return maxDate;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor() {}

  ngOnInit() {
    this.maxDate = this.getMaximumDate();
  }

  onSubmit(signupNgForm: NgForm) {
    console.log(signupNgForm);
  }

  private getMaximumDate(): Date {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18);
    return maxDate;
  }
}

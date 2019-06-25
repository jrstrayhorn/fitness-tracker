import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.maxDate = this.getMaximumDate();
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => (this.isLoading = isLoading)
    );
  }

  ngOnDestroy() {
    if (this.loadingSubs) this.loadingSubs.unsubscribe();
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

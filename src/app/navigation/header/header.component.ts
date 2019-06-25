import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  isAuth = false;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscribeToAuthService();
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }

  private subscribeToAuthService(): void {
    this.authSubscription = this.authService.authChanged$.subscribe(
      authStatus => (this.isAuth = authStatus)
    );
  }
}

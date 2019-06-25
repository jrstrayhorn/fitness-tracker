import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  isAuth = false;

  @Output() sidenavClose = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscribeToAuthService();
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }

  closeSidenavAndLogout() {
    this.closeSidenav();
    this.logout();
  }

  private logout() {
    this.authService.logout();
  }

  private subscribeToAuthService() {
    this.authSubscription = this.authService.authChanged$.subscribe(
      authStatus => (this.isAuth = authStatus)
    );
  }
}

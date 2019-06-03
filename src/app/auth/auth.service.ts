import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authChange = new Subject<boolean>();
  private user: User;

  public readonly authChanged$: Observable<
    boolean
  > = this.authChange.asObservable();

  constructor(private router: Router) {}

  registerUser(authData: AuthData): void {
    this.user = this.createUser(authData);
    this.updateAuthStatusAndRouteToHomePage();
  }

  login(authData: AuthData): void {
    this.user = this.createUser(authData);
    this.updateAuthStatusAndRouteToHomePage();
  }

  logout(): void {
    this.user = null;
    this.changeAuthStatus(false);
    this.navigateTo(['/login']);
  }

  getUser(): User {
    // doing this to break the reference to the private user object so consumer outside this service can't update user
    // this will return a new instance/reference to a user object
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private createUser(authData: AuthData): User {
    return {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
  }

  private updateAuthStatusAndRouteToHomePage(): void {
    this.changeAuthStatus(true);
    this.navigateTo(['/training']);
  }

  private navigateTo(commands: string[]): void {
    this.router.navigate(commands);
  }

  private changeAuthStatus(isLoggedIn: boolean): void {
    this.authChange.next(isLoggedIn);
  }
}

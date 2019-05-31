import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authChange = new Subject<boolean>();
  private user: User;

  public readonly authChanged$: Observable<
    boolean
  > = this.authChange.asObservable();

  constructor() {}

  registerUser(authData: AuthData): void {
    this.user = this.createUser(authData);
    this.changeAuthStatus(true);
  }

  login(authData: AuthData): void {
    this.user = this.createUser(authData);
    this.changeAuthStatus(true);
  }

  logout(): void {
    this.user = null;
    this.changeAuthStatus(false);
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

  private changeAuthStatus(isLoggedIn: boolean): void {
    this.authChange.next(isLoggedIn);
  }
}

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authChange = new Subject<boolean>();
  private user: User;

  public readonly authChanged$: Observable<
    boolean
  > = this.authChange.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = { userId: user.uid, email: user.email };
        this.updateAuthStatusAndRouteToHomePage();
      } else {
        this.trainingService.cancelSubscriptions();
        this.user = null;
        this.changeAuthStatus(false);
        this.navigateTo(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    );
    // .then(result => {
    //   console.log(result);
    //   this.user = { userId: result.user.uid, email: result.user.email };
    //   this.updateAuthStatusAndRouteToHomePage();
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  login(authData: AuthData): void {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    );
    // .then(result => {
    //   console.log(result);
    //   this.user = { userId: result.user.uid, email: result.user.email };
    //   this.updateAuthStatusAndRouteToHomePage();
    // })
    // .catch(error => console.log(error));
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  getUser(): User {
    // doing this to break the reference to the private user object so consumer outside this service can't update user
    // this will return a new instance/reference to a user object
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private createUserFromAuthCredential() {}

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

import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

// should only add providers on app.module so they can be available app wide or as a singleton
// if you have any providers that are specific to just this module they can be placed
// as a provider here
@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [SharedModule, AngularFireAuthModule, AuthRoutingModule]
})
export class AuthModule {}

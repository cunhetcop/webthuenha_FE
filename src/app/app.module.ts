import { NgModule } from '@angular/core';
import {FirstviewComponent} from "./firstview/firstview.component";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../enviroments/environment";
import {ShareModule} from "./share/share.module";
import { LoginComponent } from './jwt/login/login.component';
import {HouseModule} from "./house/house.module";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./register/register.component";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';

import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {MatNativeDateModule} from "@angular/material/core";
import {UserUpdteComponent} from "./user/user-updte/user-updte.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePasswordComponent } from "../app/change-password/change-password.component";
import {MatFormFieldModule} from "@angular/material/form-field";

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

import {FirstviewModule} from "./firstview/firstview.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfileComponent,
    UserUpdteComponent,
    ChangePasswordComponent,
FirstviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    HouseModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShareModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '235861921961-16hr38lia9rq2org54di718i9acd398a.apps.googleusercontent.com'
          )
        },
      ],
      onError: (err: any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],

  bootstrap: [AppComponent]
})
export class AppModule {}

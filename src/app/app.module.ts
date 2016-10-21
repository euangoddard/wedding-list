import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ROUTING } from './app.routes';
import { AuthGuard } from "./auth.guard.service";
import { FieldErrorsComponent } from "./shared/forms";
import { IdentifyComponent } from './identify/identify.component';
import { IdentityModule } from './shared/identity/identity.module';
import { ClaimPipe } from './list/claim.pipe';


export const firebaseConfig = {
  apiKey: "AIzaSyDfzsj_FNnzAcKj0kbLxe2RCt-JluooHgc",
    authDomain: "wedding-list-abf31.firebaseapp.com",
    databaseURL: "https://wedding-list-abf31.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "525788558474"
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent,
    AdminListComponent,
    FieldErrorsComponent,
    IdentifyComponent,
    ClaimPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ROUTING,
    IdentityModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

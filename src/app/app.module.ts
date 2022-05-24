import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from './auth/auth.service';
import { ScreenSizeDetectorComponent } from './screen-size-detector/screen-size-detector.component';
import { ScreenSizeDetectorService } from './screen-size-detector/screen-size-detector.service';
import { TrainingService } from './training/training.service';

import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { reduce } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ConfirmationDialogComponent,
    ScreenSizeDetectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, ScreenSizeDetectorService, TrainingService, UIService],
  bootstrap: [AppComponent],

})
export class AppModule { }

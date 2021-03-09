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
import { SizeDetectorComponent } from './size-detector/size-detector.component';
import { ResizeService } from './size-detector/resize.service';
import { TrainingService } from './training/training.service';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UIService } from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ConfirmationDialogComponent,
    SizeDetectorComponent
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
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService, ResizeService, TrainingService, UIService],
  bootstrap: [AppComponent],

})
export class AppModule { }

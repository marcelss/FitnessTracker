import { Component, ChangeDetectorRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ScreenSizeDetectorService } from './screen-size-detector/screen-size-detector.service';
import { SCREEN_SIZE } from './screen-size-detector/screen-size-detector.enum';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;    
  isMobile = false;
  screenSizeSubscription: Subscription;
  size: SCREEN_SIZE;
  isAuth = false;
  authSubscription: Subscription;

  constructor(
    private cd: ChangeDetectorRef, 
    private resizeSvc: ScreenSizeDetectorService, 
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.initAuthListener();

    // subscribe to the size change stream
    this.screenSizeSubscription = this.resizeSvc.onResize$.subscribe(x => {
      this.size = x;
      this.isMobile = this.size > 0 ? false : true;

      if (this.isAuth)
        this.sidenav.close();

      this.cd.detectChanges();
    });

    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;

      if (this.isAuth)
        this.sidenav.close();

      this.cd.detectChanges();
    });

  }

  ngOnDestroy(): void {
    if (this.screenSizeSubscription)
      this.screenSizeSubscription.unsubscribe();

    if (this.authSubscription)
      this.authSubscription.unsubscribe();
  }

}

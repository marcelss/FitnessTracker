import { Component, ChangeDetectorRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ScreenSizeDetectorService } from './screen-size-detector/screen-size-detector.service';
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
  screenSizeSubscription: Subscription;      

  constructor(    
    private resizeSvc: ScreenSizeDetectorService, 
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.initAuthListener();

    // subscribe to the size change stream
    this.screenSizeSubscription = this.resizeSvc.onResize$.subscribe(size => {                  
        this.sidenav.close();      
    });
  }

  ngOnDestroy(): void {
    if (this.screenSizeSubscription)
      this.screenSizeSubscription.unsubscribe();
  }

}

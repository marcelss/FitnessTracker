import { Component, ChangeDetectorRef, OnDestroy, ViewChild, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SCREEN_SIZE } from './size-detector/screen-size.enum';
import { ResizeService } from './size-detector/resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  isMobile = false;

  size: SCREEN_SIZE;

  /*constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', (e) => {
      if (e.matches) {
        console.log('This is a narrow screen — less than 600px wide.');
        this.sidenav.close();
      } else {
        console.log('This is a wide screen — more than 600px wide.');
        this.sidenav.open();
      }
    });
  }*/

  constructor(private cd: ChangeDetectorRef, private resizeSvc: ResizeService) {
    // subscribe to the size change stream
    this.resizeSvc.onResize$.subscribe(x => {
      this.size = x;
      if (x > 0) {
        this.isMobile = false;
        if (this.sidenav !== undefined) {
          this.sidenav.open();
        }
      } else {
        this.isMobile = true;
        if (this.sidenav !== undefined) {
          this.sidenav.close();
        }
      }
      console.log('Size: ' + this.size);
    });
  }

  ngAfterViewInit(): void {
    if (this.isMobile) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
  }

}

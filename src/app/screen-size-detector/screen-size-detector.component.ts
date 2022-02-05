import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';
import { SCREEN_SIZE } from './screen-size-detector.enum';
import { ScreenSizeDetectorService } from './screen-size-detector.service';

@Component({
  selector: 'app-screen-size-detector',
  templateUrl: './screen-size-detector.component.html',
  styleUrls: ['./screen-size-detector.component.css']
})
export class ScreenSizeDetectorComponent implements AfterViewInit {
  @Input() showSize: boolean;
  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs',
      css: `d-block d-sm-none`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm',
      css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md',
      css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg',
      css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.XL, name: 'xl',
      css: `d-none d-xl-block`
    },
  ];

  constructor(private elementRef: ElementRef, private resizeSvc: ScreenSizeDetectorService) { }

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const currentSize = this.sizes.find(x => {
      const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);
      const isVisible = window.getComputedStyle(el).display !== 'none';

      return isVisible;
    });

    this.resizeSvc.onResize(currentSize.id);
  }

}

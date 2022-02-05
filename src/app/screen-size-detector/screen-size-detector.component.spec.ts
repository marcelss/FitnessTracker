import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeDetectorComponent } from './screen-size-detector.component';

describe('ScreenSizeDetectorComponent', () => {
  let component: ScreenSizeDetectorComponent;
  let fixture: ComponentFixture<ScreenSizeDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenSizeDetectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSizeDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

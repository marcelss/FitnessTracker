import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseSideNav() {
    this.sideNavClose.emit();
  }
}

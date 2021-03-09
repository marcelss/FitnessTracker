import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }
  showSnackbar(message: string, action: string, duration: number = 3000) {
    this.snackbar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

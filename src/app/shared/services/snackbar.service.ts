import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private readonly snackBar = inject(MatSnackBar);

  show(
    type: 'success' | 'warning' | 'error' | 'info',
    message = "", 
    title = ""
  ) {
    let panelClass = '';
    if (type === 'success') {
      panelClass = 'snack-bar-success';
    } else if (type === 'warning') {
      panelClass = 'snack-bar-warning';
    } else if (type === 'error') {
      panelClass = 'snack-bar-error';
    } else if (type === 'info') {
      panelClass = 'snack-bar-info';
    }

    this.snackBar.open(`${title}: ${message}`, 'Cerrar', {
      duration: 5000,
      panelClass:[panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
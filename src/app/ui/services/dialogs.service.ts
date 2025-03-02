import { Injectable } from '@angular/core';
import { DialogData } from '@ui-models/dialogs.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@ui-dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  
  constructor(
    private readonly dialog: MatDialog
  ){}
  /**
   * Metodo generico para ser reutilizado en los casos en los que se precise pedirle confirmacion al usuario previo a alguna accion
   * @param data => Estructura de datos DialogData
   * @param config  => config extra o necesaria para el dialog
   * @returns => false/true
   */
  confirmDialog(data: DialogData, config: MatDialogConfig  = {minWidth: '50%', maxWidth: '100%',disableClose: true }): Observable<boolean>{
    const mergeConfig = {
      ...config,
      data
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, mergeConfig);

    return dialogRef.afterClosed();
  }
}

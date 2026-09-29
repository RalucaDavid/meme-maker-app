import { Service, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';

@Service()
export class NotificationService {
  private snackBar = inject(MatSnackBar);
  private transloco = inject(TranslocoService);

  showSuccess(key: string, params?: Record<string, any>, actionKey: string = 'ok'): void {
    this.transloco.selectTranslate(key, params).subscribe((translatedMessage) => {
      const translatedAction = this.transloco.translate(actionKey);
      this.snackBar.open(translatedMessage, translatedAction, {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success'] 
      });
    });
  }

  showError(key: string, params?: Record<string, any>, actionKey: string = 'close'): void {
    this.transloco.selectTranslate(key, params).subscribe((translatedMessage) => {
      const translatedAction = this.transloco.translate(actionKey);
      this.snackBar.open(translatedMessage, translatedAction, {
        duration: 6000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-error']
      });
    });
  }
}

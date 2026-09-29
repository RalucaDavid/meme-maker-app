import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification/notification-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        notificationService.showError('unauthorized');
      } else if (error.status === 500) {
        notificationService.showError('serverError');
      }
      return throwError(() => error);
    }),
  );
};

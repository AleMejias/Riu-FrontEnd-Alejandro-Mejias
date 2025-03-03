
import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '@shared-services/spinner.service';


export const httpInterceptorInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          spinnerService.hide();
        }
      },
      error: (error: HttpErrorResponse) => {
        spinnerService.hide();
      }
    })
  );
};
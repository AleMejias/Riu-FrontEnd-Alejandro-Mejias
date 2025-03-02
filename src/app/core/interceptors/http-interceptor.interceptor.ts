// import { HttpInterceptorFn } from '@angular/common/http';

// export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '@shared-services/spinner.service';

// export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   console.log(req.url);
//   return next(req);
// }

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
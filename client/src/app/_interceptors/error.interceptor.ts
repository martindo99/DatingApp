import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key])
                }
              }
              throw modelStateErrors.flat();
            } else {
              toastr.error(error.error, error.status.toString());
            }
            break;
          case 401:
            toastr.error('Unauthorized', error.status.toString());
            break;

          case 404:
            router.navigateByUrl('/not-found');
            break;

          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            toastr.error('Something Unexpected went wrong');
            console.log(error);
            break;

        }

      }
      throw error;

    }
    )
  )
}

import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { take } from 'rxjs';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) =>{

  const accountService = inject(AccountService);
  
  if (accountService.currentUser()) {
    req = req.clone({
       setHeaders: {
          Authorization: `Bearer ${accountService.currentUser()?.token}`
        }
    })
  }
  return next(req);
}

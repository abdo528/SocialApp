import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const pLATFORM_ID = inject(PLATFORM_ID)
  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('tokenSocailApp')) {
      // if (req.url.includes('timeline')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('tokenSocailApp')!
        }
      })
      // }
    }
  }
  return next(req);
};

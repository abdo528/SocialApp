import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blankGuard: CanActivateFn = (route, state) => {
  const id = inject(PLATFORM_ID)
  const router = inject(Router)
  if (isPlatformBrowser(id)) {
    if (localStorage.getItem('tokenSocailApp')) {
      router.navigate(['/timeline'])
      return false
    }
    return true;
  }
  return false
};

import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token');
  if (!token) return true;
  return router.createUrlTree(['/login']);
};

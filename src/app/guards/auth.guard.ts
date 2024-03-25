import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
  ActivatedRoute,
  mapToCanActivate,
  CanActivate,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { TokenStorageService } from '../shared-module/services/token-storage.service';
import { AuthService } from '../shared-module/services/auth-service.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userSub.pipe(
    take(1),
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/login']);
      }
      return true;
    })
  );
};

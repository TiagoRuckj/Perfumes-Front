import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';



export const AuthGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const service = inject(AuthService);
    if (await service.loggedIn()) {
        return true;
    }

    router.navigate(['/login']);
    return false
}

export const AuthGuardAdmin: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const service = inject(AuthService);
    const decodedToken = await service.getDecodedToken().toPromise();
    if (await service.loggedIn() && decodedToken.result.isAdmin) {
        return true;
    }

    router.navigate(['/home']);
    return false
}
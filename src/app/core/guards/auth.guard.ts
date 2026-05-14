import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.estaLogado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
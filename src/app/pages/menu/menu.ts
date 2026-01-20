import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { AccountService } from '../../core/services/account/account-service';
import { finalize } from 'rxjs';
import { StorageService } from '../../core/services/storage/storage-service';

@Component({
  selector: 'app-menu',
  imports: [ParallaxDirective, NukeButton, SnowEffect],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  router = inject(Router);
  accountService = inject(AccountService);
  storageService = inject(StorageService);

  constructor() {}

  onClickLogout() {
    this.accountService
      .logout()
      .pipe(
        finalize(() => {
          // on logout quoi qu'il arrive
          this.storageService.clear();
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }
}

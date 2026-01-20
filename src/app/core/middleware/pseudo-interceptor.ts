import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage-service';

// on récupère notre account stocké s'il y en a un et en l'envoie dans toutes nos requetes
export const pseudoInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const account = storageService.read('account');
  const token = account ? JSON.parse(account).pseudo : null;

  if (!token) {
    return next(req);
  }

  // on clone et pendant son clonnage en injecte une nouvelle clé, la requete question de sécurité(je crois)
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req);
};

import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import {  Observable } from 'rxjs';
import { Account } from '../../models/account';

const RESOURCE = 'account'

@Injectable({
  providedIn: 'root',
})
export class AccountService {
   private apiService = inject(ApiService);
   //private stor = inject(StorageService);

  // Envoie une requete de création de compte avec un identifiant
  register(pseudo: string) : Observable<any> {
    return this.apiService.post(`${RESOURCE}/register`, { pseudo: pseudo });
  }
  
  // Envoie une requete de conexion avec un identifiant et s'il existe en base de donner le stock en local pour pouvoir etre identifié pour les prochaines requete
  login(pseudo: string) : Observable<any> {
    return this.apiService.post(`${RESOURCE}/login`, { pseudo: pseudo });
  }

  // Envoie une requete de deconexion et vide le storage
  logout() : Observable<any> {
    return this.apiService.get(`${RESOURCE}/logout`);}
}
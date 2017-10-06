import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class DetailService {

  constructor() { }

  getTipoDetalle():any{
    return fetch(`${environment.apiOdata}/TipoDetalles`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
      throw err;
    })
  }

  uploadMultimedia(multimedia: object): any{
    
    return fetch(`${environment.api}/CargarMedia`, {
      method: "POST",
      body: multimedia
    })
  }

}

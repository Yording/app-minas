import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class FormService {

  private queryJoin: string = ""
  private querySelect: string = ""
  constructor() { }

  getForms():any{
    return fetch(`${environment.apiOdata}/Formularios`,{
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

  getFormsQuery(query:string):any{
    return fetch(`${environment.apiOdata}/Formularios?$filter=indexof(nombreFormulario,'${query}') gt -1`,{
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

}

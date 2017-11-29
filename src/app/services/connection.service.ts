import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ConnectionService {

  private queryJoin: string = ""
  private querySelect: string = ""
  constructor() { }

  getConnections(): any{
    this.queryJoin = "expand=Formulario"
    this.querySelect = "select=*,Formulario/*"
    return fetch(`${environment.apiOdata}/Conexiones?$${this.queryJoin}&$${this.querySelect}`,{
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
  validarNombreConexionExiste(nombreConexion:string):any{
    return fetch(`${environment.apiOdata}/Conexiones?$filter=nombreConexion eq '${nombreConexion}'`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    
  }
  validarFormularioExiste(nombreConexion:number):any{
    return fetch(`${environment.apiOdata}/Conexiones?$filter=idFormulario eq ${nombreConexion}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    
  }
  getTypeConnections():any{
    return fetch(`${environment.apiOdata}/TipoConexiones`,{
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
  
  createConnection(connection: object): any{

    return fetch(`${environment.apiOdata}/Conexiones`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(connection)
    })
  }

}

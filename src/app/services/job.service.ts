import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class JobService {

  private queryJoin: string = ""
  private querySelect: string = ""
  constructor() { }

  getJobDisponible():any{
    return fetch(`${environment.api}/Job`,{
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
  actualizarFecha(guidFormulario:string):any{
    return fetch(`${environment.api}/HelperUp?GuidFormulario=${guidFormulario}`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guidFormulario)
    })
    .then(response => {
        if(response.ok){
            console.log("se actualiza la fecha sastisfactoriamente")
        }
      })
    .catch(err=>{
        console.log("error")
    })
  }
  

}

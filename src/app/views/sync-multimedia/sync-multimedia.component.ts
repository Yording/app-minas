import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http'; 
// import { Headers } from '@angular/http'
// import { RequestOptions } from '@angular/http'; 

// Services
import { ConnectionService } from '../../services/connection.service';
import { DetailService } from '../../services/detail.service';

import { GrowlModule, Message } from 'primeng/primeng';

import 'rxjs/add/operator/map'; 

@Component({
  selector: 'app-sync-multimedia',
  templateUrl: './sync-multimedia.component.html',
  styleUrls: ['./sync-multimedia.component.css'],
})
export class SyncMultimediaComponent implements OnInit {

  private multimedia:object
  private connections: object[]
  private tipoDetalles: object[]
  uploadedFiles: any[] = [];
  msgs: Message[] = [];
  dateValue: Date;

  constructor(private connectionService: ConnectionService, private detailService: DetailService) { 
    this.reset()
  }

  ngOnInit() {
    this.connectionService.getConnections()
    .then(data => {
      var response = data["value"]
      this.connections = response.map(ele => {
        return {
          id: ele["idConexion"],
          nombre: ele["Formulario"]["nombreFormulario"]
          
        }
      })
    })
    this.detailService.getTipoDetalle()
    .then(data => {
      var response = data["value"]
      this.tipoDetalles = response.map(ele => { 
          return {
            id: ele["idTipoDetalle"],
            nombre: ele["nombreTipoDetalle"]
            
          }
      })
    })
    
  }

  // GuardarFormato(ObjetoFormato: any, UrlServicio: string) {
  
  //     var Datos = new FormData;
      
  //     Datos.append('idActividad', this.multimedia["idActividad"]);
  //     Datos.append('idConexion', this.multimedia["idActividad"]);
  //     Datos.append('files', this.multimedia["files"]);
  //     Datos.append('idTipoDetalle', this.multimedia["idTipoDetalle"]);
  //     Datos.append('descripcion', this.multimedia["descripcion"]);
  //     Datos.append('nombreActividad', this.multimedia["nombreActividad"]);

      
  //     // var headers = new Headers();
  //     // var options = new RequestOptions({header: headers });
      
  //     return this._http.post(UrlServicio + 'Formato'
  //     , Datos).map(res => res.json());
  // } 
  
  syncMultimedia(){
    this.multimedia["files"] = this.uploadedFiles
    this.multimedia["idActividad"] = 1
    console.log(this.multimedia)
    var Datos = new FormData
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      Datos.append(`files[]`, this.uploadedFiles[i], this.uploadedFiles[i].name);
   }
    Datos.append('idActividad', this.multimedia["idActividad"]);
    Datos.append('idConexion', this.multimedia["idActividad"]);
    // Datos.append('files', this.multimedia["files"]);
    Datos.append('idTipoDetalle', this.multimedia["idTipoDetalle"]);
    Datos.append('descripcion', this.multimedia["descripcion"]);
    Datos.append('nombreActividad', this.multimedia["nombreActividad"]);
    console.log(Datos)
    this.detailService.uploadMultimedia(Datos)
  }

  onSelectDates(event){
    console.log(this.dateValue)
  }

  reset(){
    this.multimedia = {}
    this.uploadedFiles = []
  }

  onError(event) {
    this.msgs = []
    this.msgs.push({severity:'error', summary:'Error', detail:'Se tuvó el siguiente err: '+event.err});
    // console.log("onError",event)
  }
  onClear(event) {
    // console.log("onClear",event)
    this.uploadedFiles = []
  }
  onRemove(event) {
    var i = 0;
    this.uploadedFiles.map(file => {
        // Si coincide el nombre del archivo a eliminar
        // con alguno de los que existen lo quita
        if(file["name"]== event.file["name"]){
          this.uploadedFiles.splice(i, 1);
        }
        i++;
    })
    // console.log(this.uploadedFiles,event.file["name"])
  }

  onSelect(event) {
    // console.log("onSelect",event)
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    // console.log(this.uploadedFiles)
  }
}

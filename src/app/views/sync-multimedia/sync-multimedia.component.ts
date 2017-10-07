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
  actividades:any=[]
  actividad:any =[]
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
          nombre: ele["Formulario"]["nombreFormulario"],
          guid:ele["Formulario"]["GUIDFormulario"]
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

  syncMultimedia(){
    this.multimedia["files"] = this.uploadedFiles
    this.multimedia["idActividad"] = this.actividad["IdActividad"]
    this.multimedia["nombreActividad"] = this.actividad["NombreFormulario"]
    console.log(this.multimedia)
    var Datos = new FormData
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      Datos.append(`files[${i}]`, this.uploadedFiles[i], this.uploadedFiles[i].name);
   }
    Datos.append('idActividad', this.multimedia["idActividad"]);
    Datos.append('idConexion', this.multimedia["conexion"]["id"]);
    // Datos.append('files', this.multimedia["files"]);
    Datos.append('idTipoDetalle', this.multimedia["idTipoDetalle"]);
    Datos.append('Descripcion', this.multimedia["descripcion"]);
    Datos.append('NombreActividad', this.multimedia["nombreActividad"]);
    // console.log(Datos)
    this.detailService.uploadMultimedia(Datos)
  }

  onSelectDates(event){
      var FechaInicio = new Date(this.dateValue[0]).toISOString().slice(0, 10);
      var FechaFin = new Date(this.dateValue[1]).toISOString().slice(0, 10);
      if(FechaFin == null){
        FechaFin = FechaInicio
      }
      this.detailService.getActividades(this.multimedia["conexion"]["guid"],FechaInicio,FechaFin)
      .then(data => {
          this.actividades = data["Data"]
      })
      .catch(err=>{

      })
    
  }
  onRowSelect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Actividad Seleccionada', detail: event.data.IdActividad + ' - ' + event.data.NombreFormulario + ' - ' + event.data.Usuario});
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

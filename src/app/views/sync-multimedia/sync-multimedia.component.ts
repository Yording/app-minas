import { Component, OnInit,Renderer, ElementRef, ViewChild } from '@angular/core';
import {SimpleGlobal} from 'ng2-simple-global';

// Services
import { ConnectionService } from '../../services/connection.service';
import { DetailService } from '../../services/detail.service';
import { GrowlModule, Message } from 'primeng/primeng';

//Models
import {Multimedia} from '../../models/multimedia.model'
import {Col} from '../../models/col.model'

import 'rxjs/add/operator/map'; 

@Component({
  selector: 'app-sync-multimedia',
  templateUrl: './sync-multimedia.component.html',
  styleUrls: ['./sync-multimedia.component.css'],
})
export class SyncMultimediaComponent implements OnInit {
  @ViewChild('fileInput') fileInput:ElementRef;
  multimedia = new Multimedia()
  col = new Col()
  connections: object[]
  tipoDetalles: object[]
  uploadedFiles: any[] = [];
  msgs: Message[] = [];
  dateValue: Date;
  actividades:any=[]
  actividad:any =[]
  cargando:boolean=false;
  //Propiedad para indicar que archivos se pueden seleccionar
  acceptFileUpload: string = ""

  constructor(private connectionService: ConnectionService, private detailService: DetailService,private sg: SimpleGlobal,private renderer:Renderer) { 
   
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
    this.msgs = []
    this.multimedia["files"] = this.uploadedFiles
    this.multimedia["idActividad"] = this.actividad["IdActividad"]
    this.multimedia["nombreActividad"] = this.actividad["NombreFormulario"]
    // console.log(this.multimedia)
    if(this.multimedia["files"].length == 0){
      this.msgs.push({severity:'error', summary:'Error', detail:'Es obligatorio añadir multimedia para sincronizar.'});
    }
    else if(this.multimedia["idActividad"] == undefined){
      this.msgs.push({severity:'error', summary:'Error', detail:'Es obligatorio seleccionar una actividad para la multimedia.'});
    }
    else if(this.multimedia["conexion"]["id"] == undefined){
      this.msgs.push({severity:'error', summary:'Error', detail:'Es obligatorio seleccionar una conexión para la multimedia.'});
    }
    else if(this.multimedia["tipoDetalle"]["id"] == undefined){
      this.msgs.push({severity:'error', summary:'Error', detail:'Es obligatorio seleccionar una tipo detalle para la multimedia.'});
    }
    else{
      this.cargando = true;
      var Datos = new FormData
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        Datos.append(`files[${i}]`, this.uploadedFiles[i], this.uploadedFiles[i].name);
     }
      Datos.append('idActividad', this.multimedia["idActividad"]);
      Datos.append('idConexion', this.multimedia["conexion"]["id"]);
      Datos.append('idTipoDetalle', this.multimedia["tipoDetalle"]["id"]);
      Datos.append('Descripcion', (this.multimedia["descripcion"] == undefined) ? "" : this.multimedia["descripcion"]);
      Datos.append('NombreActividad', this.multimedia["nombreActividad"]);
      this.detailService.uploadMultimedia(Datos)
      .then(response => {
        // console.log(response)
        if(response.ok){
          this.msgs.push({severity:'success', summary:'Correcto', detail:'La multimedia se sincronizó satisfactoriamente.'});
          this.reset()
          //Limpiar la Multimedia es la unica forma de realizarlo, ya que si llamo
          // onclear solo funciona el array pero no limpia el componente
          this.fileInput["onClear"].emit()
          this.fileInput["files"]= []
          this.cargando = false;
          setTimeout(function(){
            this.msgs = []
          },5000)
        }
        else{
          this.msgs.push({severity:'error', summary:'Error', detail:'Se tuvó un error al realizar la petición al servidor.'});
          this.cargando = false;
        }
      })
      .catch(err => {
        console.log("Error-----------------:"+ err)
        this.msgs.push({severity:'error', summary:'Error', detail:'Se tuvó el siguiente error al sincronizar la multimedia: '+err});
        this.cargando = false;
        throw err;
      })  

    }

  }

  onSelectDates(event){
      var FechaInicio = new Date(this.dateValue[0]).toISOString().slice(0, 10);
      var FechaFin = this.dateValue[1] != null ? new Date(this.dateValue[1]).toISOString().slice(0, 10):FechaInicio
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
    this.multimedia = new Multimedia()
    this.dateValue = new Date
    this.actividades = []
    this.actividad = []
  }

  onError(event) {
    this.msgs = []
    this.msgs.push({severity:'error', summary:'Error', detail:'Se tuvó el siguiente err: '+event.err});
    // console.log("onError",event)
  }
  onChangeConexion(){
    this.dateValue = new Date
    this.actividades = []
  }
  onChangeTipoDetalle(event){
    this.fileInput["onClear"].emit()
    this.fileInput["files"]= []
    if(this.multimedia["tipoDetalle"]["nombre"] == "Imágen"){
      this.acceptFileUpload = "image/*"
    }
    else{
      
      this.acceptFileUpload = "video/*"
    }
    
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

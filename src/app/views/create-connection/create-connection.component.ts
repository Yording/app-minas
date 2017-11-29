import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// Services
import { ConnectionService } from '../../services/connection.service';
import { FormService } from '../../services/form.service';
import {JobService} from '../../services/job.service';
import { GrowlModule, Message } from 'primeng/primeng';

//Models
import {Connection} from '../../models/connection.model'

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.css'],
  providers: [JobService]
})
export class CreateConnectionComponent implements OnInit {

  connection = new Connection()
  typeConnections: object[]
  forms: object[]
  form: object;
  results: string[];
  msgs: Message[] = [];

  constructor(private connectionService: ConnectionService, private formService: FormService,private jobService:JobService) { 
    this.reset()
  }

  ngOnInit() {
    // this.connectionService.getTypeConnections()
    // .then(data => {
    //   var response = data["value"]
    //   this.typeConnections = response.map(ele => {
    //     return {
    //       id: ele["idTipoConexion"],
    //       nombre: ele["nombreTipoConexion"]
          
    //     }
    //   })
    // })
    this.jobService.getJobDisponible()
    .then(data => {
        var value = data["Data"]["idJob"]
        if(value){
          this.connection["idJob"]=value
        }
    })
    .catch(err => {
      console.log("Error-----------------:"+ err)
      this.msgs.push({severity:'error', summary:'Error', detail:'Hubo un error al obtener el job disponible, por favor recargue de nuevo la página'});
      throw err;
      
    })
    // this.formService.getForms()
    // .then(data => {
    //   var response = data["value"]
    //   this.forms = response.map(ele => { 
    //       return {
    //         id: ele["idFormulario"],
    //         nombre: ele["nombreFormulario"]
            
    //       }
    //   })
    // })
    
  }
  
  createConnection(){
    this.msgs = []
    
    try{
      if(this.connection["nombreConexion"] == ""){
        this.msgs.push({severity:'error', summary:'Error', detail:'El campo nombre de la conexión es obligatorio.'});
      }
      else if(typeof(this.form) == "string" || this.form["idFormulario"]==undefined){
        this.msgs.push({severity:'error', summary:'Error', detail:'El campo buscar formularios es obligatorio.'});
      }
      else if(this.connection["periodoSincronizacion"] == null || this.connection["periodoSincronizacion"] == undefined){
        this.msgs.push({severity:'error', summary:'Error', detail:'El campo periodo de sincronización es obligatorio.'});
      }
      else if(this.connection["periodoSincronizacion"] < 5){
        this.msgs.push({severity:'error', summary:'Error', detail:'El valor de periodo sincronización se requiere sea mayor o igual a 5 minutos.'});
      }
      else{
        this.connection["idFormulario"] = this.form["idFormulario"]
        console.log(this.connection)
        this.connectionService.createConnection(this.connection)
        .then(response => {
          if(response.ok){
            this.msgs.push({severity:'success', summary:'Correcto', detail:'La Conexión fue creada correctamente.'});
            this.jobService.actualizarFecha(this.form["GUIDFormulario"])
            this.reset()
          }
          else{
            this.connectionService.validarNombreConexionExiste(this.connection["nombreConexion"])
            .then(data => {
              if(data.value.length == 0){
                return true
              }
              else{
                this.msgs.push({severity:'error', summary:'Error', detail:'El nombre para esta conexión ya esta siendo usado, por favor intentar con otro nombre.'});
              }
            })
            this.connectionService.validarFormularioExiste(this.connection["idFormulario"])
            .then(data => {
              if(data.value.length == 0){
                return true
              }
              else{
                this.msgs.push({severity:'error', summary:'Error', detail:'Ya existe una conexión creada para este formulario, por favor intentar con otro formulario.'});
              }
            })
          }
        })
        .catch(err => {
          console.log("Error-----------------:"+ err)
          this.msgs.push({severity:'error', summary:'Error', detail:'Hubo el siguiente error al realizar la petición: '+err});
          throw err;
        })  
      }
    }
    catch(err){
      console.log("Error-----------------:"+ err)
      this.msgs.push({severity:'error', summary:'Error', detail:'Hubo el siguiente error al realizar la petición: '+err});
      throw err;
    }
        
  }

  reset(){
    this.connection = new Connection()
    this.form = {}
  }

  searchForm(event){
    this.formService.getFormsQuery(event.query).then(data => {
      this.results = data.value;
    });
  }
}

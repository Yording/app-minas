import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// Services
import { ConnectionService } from '../../services/connection.service';
import { FormService } from '../../services/form.service';
import {JobService} from '../../services/job.service';
import { GrowlModule, Message } from 'primeng/primeng';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.css'],
  providers: [JobService]
})
export class CreateConnectionComponent implements OnInit {

  private connection:object
  private typeConnections: object[]
  private forms: object[]
  form: object;
  results: string[];
  msgs: Message[] = [];

  constructor(private connectionService: ConnectionService, private formService: FormService,private jobService:JobService) { 
    this.reset()
  }

  ngOnInit() {
    this.connectionService.getTypeConnections()
    .then(data => {
      var response = data["value"]
      this.typeConnections = response.map(ele => {
        return {
          id: ele["idTipoConexion"],
          nombre: ele["nombreTipoConexion"]
          
        }
      })
    })
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
      if(typeof(this.form) == "string" || this.form["idFormulario"]==undefined){
        this.msgs.push({severity:'error', summary:'Error', detail:'Por favor seleccione un formulario para permitir crear la conexión.'});
      }
      else{
        this.connection["idFormulario"] = this.form["idFormulario"]
        this.connectionService.createConnection(this.connection)
        .then(response => {
          if(response.ok){
            this.msgs.push({severity:'success', summary:'Correcto', detail:'La Conexión fue creada correctamente.'});
            this.jobService.actualizarFecha(this.form["GUIDFormulario"])
            this.reset()
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
    this.connection = {}
    this.form = {}
  }

  searchForm(event){
    this.formService.getFormsQuery(event.query).then(data => {
      console.log(data.value)
      this.results = data.value;
    });
  }
}

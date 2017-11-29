import { Component, OnInit } from '@angular/core';
declare var $:any
// Services
import { ConnectionService } from '../../services/connection.service'

//components
import { SettingsConnectionComponent } from '../settings-connection/settings-connection.component'
import { EditConnectionComponent } from '../edit-connection/edit-connection.component'

//Models
import { Connection } from '../../models/connection.model';

@Component({
  selector: 'app-list-connections',
  templateUrl: './list-connections.component.html',
  styleUrls: ['./list-connections.component.css'],
  viewProviders: [SettingsConnectionComponent, EditConnectionComponent]
})
export class ListConnectionsComponent implements OnInit {

  connections: object[]

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    // Se retorna todo los recursos que envia la api
    this.CargarTable();
  }

  objConexxion  = new Connection();
 


  cargarArchivo(Datos) {
    //console.log(Datos);
    this.objConexxion = new Connection(Datos.Nombre,Datos.Periodo,Datos.descripcion,Datos.Id,Datos.idFormulario,Datos.idjob)
  
  }

  CargarTable(){
    this.connectionService.getConnections()
    .then(data => {
      // se obtiene la respuesta en la variable response
      var response = data["value"]
      //console.log(response);
      // Se realiza un mapeo de las caracteristicas que se mostraran en la lista
      this.connections = response.map(function (ele) {
        return {
          Id: ele["idConexion"],
          "Nombre": ele["nombreConexion"],
          "Formulario": ele["Formulario"]["nombreFormulario"],
          "Fuente": ele["fuente"],
          "Periodo": ele["periodoSincronizacion"],
          "descripcion": ele["descripcion"],
          "idFormulario": ele["idFormulario"],
          "idjob": ele["idJob"],
  
        }
      })
    });

  }

  updateConnection() {

    //console.log(this.objConexxion);
    this.connectionService.updateConnection(this.objConexxion)
      .then(data => {
        console.log("Actualización satisfactoria");
        this.CargarTable();
        $('#modalEdit').modal('hide') 
      })

      .catch(err => {
        console.log("error presentado en:" + err);
      })
  }


}

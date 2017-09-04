import { Component, OnInit } from '@angular/core';

// Services
import { ConnectionService } from '../../services/connection.service'

//components
import { SettingsConnectionComponent } from '../settings-connection/settings-connection.component'
import { EditConnectionComponent } from '../edit-connection/edit-connection.component'

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
    this.connectionService.getConnections()
      .then(data => {
          // se obtiene la respuesta en la variable response
          var response = data["value"]
  
          // Se realiza un mapeo de las caracteristicas que se mostraran en la lista
          this.connections = response.map(function(ele){
            return {
              Id: ele["idConexion"],
              "Nombre": ele["nombreConexion"],
              "Fuente": ele["fuente"],
              "Destino": ele["destino"],
              "Periodo(seg)": ele["periodoSincronizacion"],
              "Tipo": ele["TipoConexion"]["nombreTipoConexion"],
            }
          })
      });
  }
}

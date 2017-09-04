import { Component, OnInit } from '@angular/core';

// Services
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-create-connection',
  templateUrl: './create-connection.component.html',
  styleUrls: ['./create-connection.component.css']
})
export class CreateConnectionComponent implements OnInit {

  private connection:object
  private typeConnections: object[]
  constructor(private connectionService: ConnectionService) { 
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
  }
  
  createConnection(){
    this.connection = {
      idTipoConexion: this.connection["idTipoConexion"],
      nombreConexion: this.connection["nombreConexion"],
      fuente: this.connection["fuente"],
      usuarioFuente: this.connection["usuarioFuente"],
      contraseñaFuente: this.connection["passFuente"],
      destino: this.connection["destino"],
      usuarioDestino: this.connection["usuarioDestino"],
      contraseñaDestino: this.connection["passDestino"],
      periodoSincronizacion: this.connection["periodoSincronizacion"],
      descripcion: this.connection["descripcion"],
    }
    console.log(this.connection)
    this.connectionService.createConnection(this.connection)
  }

  reset(){
    this.connection = {}
  }
}

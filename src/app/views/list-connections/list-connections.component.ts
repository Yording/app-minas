import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

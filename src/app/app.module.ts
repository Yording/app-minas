import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

// services
import { ConnectionService } from './services/connection.service';
import { FormService } from './services/form.service';
import { DetailService } from './services/detail.service';

import {FileUploadModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TableComponent } from './components/table/table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateConnectionComponent } from './views/create-connection/create-connection.component';
import { ListConnectionsComponent } from './views/list-connections/list-connections.component';
import { SettingsConnectionComponent } from './views/settings-connection/settings-connection.component';
import { EditConnectionComponent } from './views/edit-connection/edit-connection.component';
import { SyncMultimediaComponent } from './views/sync-multimedia/sync-multimedia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TableComponent,
    NavbarComponent,
    FooterComponent,
    CreateConnectionComponent,
    ListConnectionsComponent,
    SettingsConnectionComponent,
    EditConnectionComponent,
    SyncMultimediaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    GrowlModule,
    FileUploadModule,
    AutoCompleteModule,
    DataTableModule,
    SharedModule,
    CalendarModule
  ],
  providers: [ConnectionService,FormService,DetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

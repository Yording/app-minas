import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    EditConnectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

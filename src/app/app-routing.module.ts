import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './views/login/login.component';
import { TableComponent } from './components/table/table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateConnectionComponent } from './views/create-connection/create-connection.component';
import { ListConnectionsComponent } from './views/list-connections/list-connections.component';
import { SettingsConnectionComponent } from './views/settings-connection/settings-connection.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: 'login', component: LoginComponent },
    { path: 'create-connection', component: CreateConnectionComponent },
    { path: 'list-connections', component: ListConnectionsComponent},
    { path: 'settings-connections', component: SettingsConnectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
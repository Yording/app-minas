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
import { SyncMultimediaComponent } from './views/sync-multimedia/sync-multimedia.component';

// guards
import {AuthGuard} from './guards/auth.guard'

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: 'login', component: LoginComponent },
    { path: 'create-connection', component: CreateConnectionComponent, canActivate:[AuthGuard] },
    { path: 'list-connections', component: ListConnectionsComponent, canActivate:[AuthGuard]},
    { path: 'settings-connections', component: SettingsConnectionComponent, canActivate:[AuthGuard]},
    { path: 'sync-multimedia', component: SyncMultimediaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
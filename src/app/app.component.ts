import { Component } from '@angular/core';

// Components
import { NavbarComponent } from './components/navbar/navbar.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [NavbarComponent]
})
export class AppComponent {
  
}

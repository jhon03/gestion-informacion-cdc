import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material/material/material.module';
import { InfoCdcComponent } from '../info-cdc/info-cdc.component';
import { MatSidenav } from '@angular/material/sidenav';
import { EscenarioProblemaComponent } from '../escenario-problema/escenario-problema.component';
@Component({
  selector: 'app-pagina-inicio',
  standalone: true,
  imports: [ 
    MaterialModule,
    InfoCdcComponent, 
    EscenarioProblemaComponent
  ],
  templateUrl: './pagina-inicio.component.html',
  styleUrl: './pagina-inicio.component.css'
})
export class PaginaInicioComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  
}

import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import { PaginaInicioComponent } from '../../../components/pagina-inicio/pagina-inicio.component';
import { InfoCdcComponent } from '../../../components/info-cdc/info-cdc.component';
import { EscenarioProblemaComponent } from '../../../components/escenario-problema/escenario-problema.component';
import { CrearColaboradorComponent } from '../colaborador/crear-colaborador/crear-colaborador.component';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-panel-administracion',
  standalone: true,
  imports: [
 MaterialModule,
 CrearColaboradorComponent,
 RolesComponent
  ],
  templateUrl: './panel-administracion.component.html',
  styleUrl: './panel-administracion.component.css'
})
export class PanelAdministracionComponent {


  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  }

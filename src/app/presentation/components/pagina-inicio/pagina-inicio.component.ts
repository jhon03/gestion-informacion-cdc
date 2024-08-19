import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material/material/material.module';
import { InfoCdcComponent } from '../info-cdc/info-cdc.component';
import { MatSidenav } from '@angular/material/sidenav';
import { EscenarioProblemaComponent } from '../escenario-problema/escenario-problema.component';
import { Router } from '@angular/router';
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

  constructor(private router: Router){}

  navigateToLogin(): void{
    this.router.navigate(['/login']).then(success => {
      if (success){
        console.log('navegación sactisfatoria');
      } else {
        console.error('navegación ha fallado');
      }
    });
  }
}

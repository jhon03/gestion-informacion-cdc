import { Component, OnDestroy, OnInit } from '@angular/core';
import { Colaborador } from '../../../../domain/models/colaborador.models';

import { Subscription } from 'rxjs';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';


@Component({
  selector: 'app-colaborador',
  standalone: true,
  imports: [],
  templateUrl: './colaborador.component.html',
  styleUrl: './colaborador.component.css'
})
export class ColaboradorComponent  implements OnInit, OnDestroy{

// colaborador: Colaborador = new Colaborador();
  private subscriptionCrearCol!: Subscription;

  ngOnInit(): void {
      
  }
  ngOnDestroy(): void {
      
  }
constructor(private colaboradorService: ColaboradorService, private subscription: Subscription ){


}

/*crearColaborador(){
this.subscriptionCrearCol = this.colaboradorService.crearColaborador(this.colaborador).subscribe(
  {
    next:(date) => {
      

     
    }
  }
)
 
}*/
  
}

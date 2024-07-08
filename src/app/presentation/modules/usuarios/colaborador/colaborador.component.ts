import { Component, OnDestroy, OnInit } from '@angular/core';
import { Colaborador } from '../../../../domain/models/colaborador.models';

import { Subscription } from 'rxjs';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';


@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrl: './colaborador.component.css'
})
export class ColaboradorComponent  implements OnInit, OnDestroy{


  ngOnInit(): void {   
  }
  ngOnDestroy(): void {   
  } 

  constructor(private colaboradorService: ColaboradorService ){}

  
}

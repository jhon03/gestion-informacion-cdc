import { Component, OnInit } from '@angular/core';
import { Programa } from '../../../../domain/entities/programa.model';

@Component({
  selector: 'app-eval-activacion-programas',
  standalone: true,
  imports: [],
  templateUrl: './eval-activacion-programas.component.html',
  styleUrl: './eval-activacion-programas.component.css'
})
export class EvalActivacionProgramasComponent implements OnInit{

  programs: any[] = [];
  collaborators: any[] = [];
  

  constructor(

  ) {}
  ngOnInit(): void {
    
  }

}

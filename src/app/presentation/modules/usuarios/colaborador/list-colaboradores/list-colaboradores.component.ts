import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-list-colaboradores',
  templateUrl: './list-colaboradores.component.html',
  styleUrl: './list-colaboradores.component.css'
})
export class ListColaboradoresComponent implements OnInit, OnDestroy{

  private colaboradoresListSuscripcion: Subscription | null = null;
 

  constructor( ){

  }

  ngOnInit(): void {
     
  }

  ngOnDestroy(): void {
      this.colaboradoresListSuscripcion?.unsubscribe();
  }

 

}

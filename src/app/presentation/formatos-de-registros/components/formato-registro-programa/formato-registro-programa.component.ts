import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formato-registro-programa',
  standalone: true,
  imports: [],
  templateUrl: './formato-registro-programa.component.html',
  styleUrl: './formato-registro-programa.component.css'
})
export class FormatoRegistroProgramaComponent implements OnInit{

  columns: { name: string}[]=[];

  constructor(){}

  ngOnInit(): void {}

  addColumn(): void {
    this.columns.push({ name: ''});
  }

  removeColumn(index: number): void {
    this.columns.splice(index, 1);
  }

  saveFormat(): void {
    console.log('Formato guardado: ', this.columns);
  }

}

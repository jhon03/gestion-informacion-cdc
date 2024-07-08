import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-programa',
  standalone: true,
  imports: [],
  templateUrl: './registro-programa.component.html',
  styleUrl: './registro-programa.component.css'
})
export class RegistroProgramaComponent implements OnInit {



  program = {

    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: 0
  };


  constructor(){}

    
  ngOnInit(): void {}


  
}

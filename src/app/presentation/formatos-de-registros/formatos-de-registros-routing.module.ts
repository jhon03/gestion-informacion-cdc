import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogAsignarNombre, FormatoRegistroProgramaComponent } from './components/formato-registro-programa/formato-registro-programa.component';

const routes: Routes = [


  {
    path: 'formato-registro-programa', 
    component: FormatoRegistroProgramaComponent
  },

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatosDeRegistrosRoutingModule { }

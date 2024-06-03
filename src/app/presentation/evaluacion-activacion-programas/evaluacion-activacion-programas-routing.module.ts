import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvalActivacionProgramasComponent } from './componentes/eval-activacion-programas/eval-activacion-programas.component';

const routes: Routes = [

  { path: '', component: EvalActivacionProgramasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionActivacionProgramasRoutingModule { }

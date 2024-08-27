import { Component } from '@angular/core';
import { LoginRepository } from '../../../../domain/repositories/login.repository';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(
    private loginRepository: LoginRepository,
  ){}

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  onSubmit(): void {
    this.loginRepository.loggout();
  }

}

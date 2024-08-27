import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolRepositoryImpl } from '../../../../infrastructure/repositoryImpl/rol.repositoryImpl';
import { Subscription } from 'rxjs';
import { RolDto } from '../../../../infrastructure/dto/rol.dto';
import { rolRequest, rolResponse } from '../../../../infrastructure/helpers/interfaces/rol.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { BreakpointObserver } from '@angular/cdk/layout';

const rol = {
  nombreRol: '',
  descripcion: '',
}
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit, OnDestroy{
   
  showAlert: any;
  showSnackBar: any;
  constructor(
    private fb: FormBuilder,
    private rolRepository: RolRepositoryImpl,
    private snackBar: MatSnackBar
  ){}

  public rolForm: FormGroup = this.fb.group({
  nombreRol: ['', [Validators.minLength(3), Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],

    descripcion: ['', [Validators.minLength(10), Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]]
  })
  public rolSuscripcion: Subscription| null = null; 
  public roles: RolDto[]| null = null;
  public rol: rolRequest= 
  {nombreRol: "", descripcion: ""};

  ngOnDestroy(): void {
      this.rolSuscripcion?.unsubscribe();

  }
  ngOnInit(): void {
      this.rolForm.reset(rol);
  }
  get currentRol(): rolRequest{
    const rol = this.rolForm.value as rolRequest;
    return rol;
  }

  onSubmit(){
    if(this.rolForm.invalid) {
      this.rolForm.markAllAsTouched();
      return;
    }
    this.rol.nombreRol = this.currentRol.nombreRol;
    this.rol.descripcion = this.currentRol.descripcion;
    this.crearRol();
    console.log(this.rol)
  }
  crearRol() {
    this.rolSuscripcion = this.rolRepository.create(this.rol).subscribe({
      next: (res: rolResponse) => {
        this.showSnackBar("rol creado exitosamente");
        console.log(res);
      },
      error: ({error}) => {
        this.showAlert(error.errors[0].msg, false);
      }
      })
    }
    isValidField( field: string): boolean| null{
      return this.rolForm.controls[field].errors && 
      this.rolForm.controls[field].touched;
    }

    getFieldError(field: string): string | null {
      if (!this.rolForm.controls[field])

        return null;

        const errors = this.rolForm.controls
        [field].errors || {};
        for (const key of Object.keys(errors)){
         
          switch (key) {
            case 'required':
              return '*este campo es requerido';

              case 'pattern':
                if (field === 'numeroIdentificacion'){
                  return '*este campo debe tener solo números';
                } else if(field === 
                  'nombreColaborador'){
                    return '*este campo debe tener solo letras'
                  }
                  return '*fallo al validar una expresión regular';

                  case 'minlenght':
                    return `*EL campo debe tener minimo ${ errors['minlength'].requiredLength} caracteres`;
                
          }

        }
        return null;
    }
  }


import { Injectable, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../../enviroments/enviroment';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, Subscription, switchMap, tap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { TokenRepository } from '../../../domain/repositories/tokenRepository';
import { loginRequest, loginResponse } from '../../helpers/interfaces/login.interface';
import { mostrar } from '../../plugins/jwt/sweetalert/swal.plugin';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticacionService implements OnDestroy {


  private validacionSuscripcion: Subscription | null = null;
  private isUserLoggin: BehaviorSubject<boolean> = new BehaviorSubject(
    !!sessionStorage.getItem('token')
  );
  private userRol: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Servicio para almacenar el rol del usuario

  private apiUrl: string = `${environment.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenRepository: TokenRepository
  ) { }

  ngOnDestroy(): void {
    this.validacionSuscripcion?.unsubscribe();
  }

  getColaboradorId(): string {
    const idColaborador = sessionStorage.getItem('idColaborador'); // Obtener ID del sessionStorage

    if (idColaborador) {
      return idColaborador;
    } else {
      throw new Error('ID del colaborador no encontrado en el sessionStorage');
    }
  }

  getUserIsLogin(): Observable<boolean> {
    return this.isUserLoggin.asObservable();
  }

  getUserRole(): string {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      //this.userRol.next(decodedToken.rol); // Actualiza el BehaviorSubject
      return decodedToken.rol;
    }
    return '';
  }

  // Iniciar sesión
  public iniciarSesion(formLogin: loginRequest): Observable<HttpResponse<loginResponse>> {
    return this.http.post<loginResponse>(`${this.apiUrl}/login`, formLogin, {
      observe: 'response',
    }).pipe(tap(({ body, status }: HttpResponse<loginResponse>) => {
      if (status === 200 && body) {
        this.tokenRepository.setTokenInBrowser(body.tokenAcesso);

        // Almacenar el idColaborador en el sessionStorage desde la respuesta del backend
        if (body.usuario && body.usuario.idColaborador) {
          sessionStorage.setItem('idColaborador', body.usuario.idColaborador);
          console.log('ID del colaborador:', body.usuario.idColaborador);
        } else {
          console.error('No se pudo encontrar el idColaborador en la respuesta.');
        }

        // Almacenar el token en sessionStorage
        sessionStorage.setItem('token', body.tokenAcesso);

        this.iniciarValidacionSession(62);
        this.userRol.next(body.usuario.rol);
        this.isUserLoggin.next(true);
      }
    }));
  }

  public cerrarSesion(): void {
    this.tokenRepository.removeTokenBrowser();
    sessionStorage.removeItem('token'); // Eliminar token del sessionStorage
    sessionStorage.removeItem('idColaborador'); // Eliminar idColaborador del sessionStorage
    this.isUserLoggin.next(false); // Asignar el valor de usuario logueado a false
    this.router.navigateByUrl('/login');
    this.validacionSuscripcion?.unsubscribe();
  }

  private iniciarValidacionSession(intervaloMinutos: number){
    const intervaloMilisegundos = intervaloMinutos * 60 * 1000;
    const source = timer(0, intervaloMilisegundos);
    console.log(source);
    this.validacionSuscripcion = source.pipe(
      switchMap( () => this.validarSesionUsuario() )
    ).subscribe({
      next:(data)=> console.log(data),
      error:(error)=>{
        console.log(error),
        mostrar('sesion inactiva se cierra por su seguridad', 'informacion')
        this.cerrarSesion();
      }
    })
  }

 private validarSesionUsuario(): Observable<{msg: string}>{
    return this.http.get<{msg:string}>(`${this.apiUrl}/validateSession`);
  }


}

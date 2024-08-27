import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap, tap, timer } from 'rxjs';
import { loginRequest, loginResponse } from '../../helpers/interfaces/login.interface';
import { environments } from '../../../../environments/environments';
import { Router } from '@angular/router';
import { TokenRepository } from '../../../domain/repositories/token.repository';
import { mostrar } from '../../plugins/sweetalert/swal.plugin';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy{

  private validacionSuscripcion: Subscription|null = null;

  private isUserLoggin: BehaviorSubject<boolean> = new BehaviorSubject(
    !!localStorage.getItem('token')
  );
  private userRol: BehaviorSubject<string> = new BehaviorSubject<string>('');  //servicio para almacenar el rol del usuario
      
  private url = `${environments.baseUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenRepository: TokenRepository,
  ) {}

  ngOnDestroy(): void {
      this.validacionSuscripcion?.unsubscribe();
  }

  getUserIsLogin(): Observable<Boolean> {
    return this.isUserLoggin.asObservable();
  }

  getUserRole(): string {
    return '';
  }

  public iniciarSesion(formLogin: loginRequest): Observable<HttpResponse<loginResponse>> {
    return this.http.post<loginResponse>(`${this.url}/login`, formLogin, {
      observe: 'response',
    }).pipe( tap( ({body, status}: HttpResponse<loginResponse>) => {
        if(status == 200 && body){
          this.tokenRepository.setTokenInBrowser(body.tokenAcesso);
          this.iniciarValidacionSession(62);
          this.userRol.next(body.usuario.rol);
          this.isUserLoggin.next(true);
        }
    }));
  };

  public cerrarSesion(): void {
    this.tokenRepository.removeTokenBrowser();
    this.isUserLoggin.next(false);  //asignamos el valor de usuario logeado a false
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
    return this.http.get<{msg:string}>(`${this.url}/validateSession`);
  }


}
import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  // tslint:disable-next-line:no-inferrable-types
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  // tslint:disable-next-line:semicolon
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:whitespace
  getClientes(): Observable<Cliente[]> {
    // tslint:disable-next-line:whitespace
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }
  create(cliente: Cliente): Observable<any> {
    // tslint:disable-next-line:semicolon
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  getCliente(id): Observable<Cliente> {
    // tslint:disable-next-line:semicolon
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.memaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  update(cliente: Cliente): Observable<any> {
    // tslint:disable-next-line:semicolon
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Cliente> {
    // tslint:disable-next-line:semicolon
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.jason';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {
  // tslint:disable-next-line:no-inferrable-types
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  // tslint:disable-next-line:semicolon
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:whitespace
  getClientes(): Observable<Cliente[]> {
    // tslint:disable-next-line:whitespace
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }
  create(cliente: Cliente): Observable<Cliente> {
    // tslint:disable-next-line:semicolon
    return this.http.post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
  }
  getCliente(id): Observable<Cliente> {
    // tslint:disable-next-line:semicolon
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }
  update(cliente: Cliente): Observable<Cliente> {
    // tslint:disable-next-line:semicolon
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
  }
  delete(id: number): Observable<Cliente> {
    // tslint:disable-next-line:semicolon
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
  }
}

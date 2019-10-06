import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  // tslint:disable-next-line:no-trailing-whitespace

})
export class FormComponent implements OnInit {
  // tslint:disable-next-line:semicolon
  private cliente: Cliente = new Cliente()

  // tslint:disable-next-line:no-inferrable-types
  private titulo: string = 'Crear Cliente';

  private errores: string[];

  constructor(private clienteService: ClienteService,
    // tslint:disable-next-line:align
    private router: Router,
    // tslint:disable-next-line:align
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line:semicolon
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      const id = params['id'];
      if (id) {
        // tslint:disable-next-line:semicolon
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    });

  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        // tslint:disable-next-line:semicolon
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `El cliente ${cliente.nombre} ha sido creado con éxito! `, 'success');
      },
        err => {
          this.errores = err.error.errors as string[];
          console.log('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        // tslint:disable-next-line:semicolon
        this.router.navigate(['/clientes'])
        // tslint:disable-next-line:semicolon
        swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre} `, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.log('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        });

  }

}

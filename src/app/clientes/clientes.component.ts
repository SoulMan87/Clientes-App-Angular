import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'

})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  // tslint:disable-next-line:one-line
  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClientesComponet: tap 3');
          (response.content as Cliente[]).forEach(clientes => console.log(clientes.nombre));
        })
      ).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    }
      // importante para el observable
    );
  }
  // tslint:disable-next-line:one-line
  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
      // tslint:disable-next-line:semicolon
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      // tslint:disable-next-line:quotemark
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            // tslint:disable-next-line:whitespace
            // tslint:disable-next-line:semicolon
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito`,
              // tslint:disable-next-line:semicolon
              'success'
              // tslint:disable-next-line:semicolon
            )
          }
          // tslint:disable-next-line:semicolon
          // tslint:disable-next-line:semicolon
        )
        // tslint:disable-next-line:no-trailing-whitespace
      }
      // tslint:disable-next-line:semicolon
    })
  }

}

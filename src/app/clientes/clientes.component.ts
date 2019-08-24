import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'

})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
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

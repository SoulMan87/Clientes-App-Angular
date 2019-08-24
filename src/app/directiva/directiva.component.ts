import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
  // tslint:disable-next-line:no-inferrable-types
  listaJuegos: string[] = ['The King of Figthers ', 'Dragon Ball Figthers', 'Mario', 'Samurai Spirit', 'Street Figther', 'Mortal Kombat'];
  // tslint:disable-next-line:no-inferrable-types
  habilitar: boolean = true;
  constructor() { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-docente',
  templateUrl: './inicio-docente.page.html',
  styleUrls: ['./inicio-docente.page.scss'],
})
export class InicioDocentePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  desloguear(){
    localStorage.removeItem('ingresado-docente');
    localStorage.removeItem('nombre-docente');
    
  }

  nombreDocente = localStorage.getItem('nombre-docente');

}

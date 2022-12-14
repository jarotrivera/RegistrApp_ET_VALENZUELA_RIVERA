import { Component } from '@angular/core';

interface Componente{ //interface nombre componente
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  componentes: Componente[] = [ //arreglo llamado componentes de tipo Componente, es un arreglo
    {
      icon: 'home-outline', //icon se saca de la web oficial de ionic
      name: 'Inicio',
      redirecTo: '/home',
    },
    {
      icon: 'log-in-outline', //icon se saca de la web oficial de ionic
      name: 'Login',
      redirecTo: '/login',
    },
    {
      icon: 'help-circle-outline', //icon se saca de la web oficial de ionic
      name: 'FAQ',
      redirecTo: '/faq',
    },

  ];

 
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.page.html',
  styleUrls: ['./codigoqr.page.scss'],
})
export class CodigoqrPage implements OnInit {

  qrCodeString = 'Genera un código QR';
  scannedResult : any;

  fecha = new Date();
  fechaActual = this.fecha.getDate() + '/' + (this.fecha.getMonth() + 1) + '/' + this.fecha.getFullYear();

  docente = localStorage.getItem('nombre-docente');

  constructor() { }

  ramo = {
    nombre: '',
    fecha: this.fechaActual,
    docente: this.docente,
  }


  generaScan(){
    this.qrCodeString =this.ramo.nombre + '  ' + this.ramo.fecha + ' '+this.ramo.docente;
  }

  verScan(){
    this.scannedResult = this.qrCodeString;
  }

  ngOnInit() {
    

  }

  

}

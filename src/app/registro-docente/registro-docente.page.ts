import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesDatosService,DatosDocente } from '../services/services-datos.service';
import {Platform, ToastController, IonList,NavController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';


import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,

} from '@angular/forms';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.page.html',
  styleUrls: ['./registro-docente.page.scss'],
})
export class RegistroDocentePage implements OnInit {

 

  datos: DatosDocente[] = [];
  newDato: DatosDocente = <DatosDocente>{};
  @ViewChild('myList')myList: IonList;

  formularioRegistro: FormGroup;
  newUsuario: DatosDocente = <DatosDocente>{};

  docentes : any[] = [];

  constructor(private storageService:ServicesDatosService,
              private storage: Storage,
              private plt:Platform,private toastController:ToastController,
              private alertController:AlertController,
              private navController:NavController,
              private fb:FormBuilder) { 
               this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("",Validators.required),
                  'rut': new FormControl("",Validators.required),
                  'email': new FormControl("",Validators.required),
                  'contraseña': new FormControl("",Validators.required),
                  'sede': new FormControl("",Validators.required),
              });
            }

  ngOnInit() {
  }

  /* async crearUsuario(){
    var form = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe completar todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.newUsuario.nombre = form.nombre;
    this.newUsuario.rut = form.rut;
    this.newUsuario.email = form.email;
    this.newUsuario.contraseña = form.contraseña;
    this.newUsuario.sede = form.sede;
    this.storageService.addDatos(this.newUsuario).then(dato=>{
      this.newUsuario = <DatosDocente>{};
      this.showToast('Datos Guardados');
    });
  } */








  onSubmit(){
  }

  getDatos(): Promise<DatosDocente[]> {
    return this.storage.get('my-datos-docente');
  }

  addDato(){
    const form = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
      this.alerta('Debe completar todos los campos');
      return;
    }
    this.getDatos().then(datos=>{
      this.docentes = datos;
      
      if(this.docentes != null || this.docentes != undefined){
        for(let i=0; i<this.docentes.length; i++){
          if(this.docentes[i].email == form.email){
            this.alerta('El email ya está registrado en el sistema');
            return;
          }
          else{
            this.newUsuario.nombre = form.nombre;
            this.newUsuario.rut = form.rut;
            this.newUsuario.email = form.email;
            this.newUsuario.contraseña = form.contraseña;
            this.newUsuario.sede = form.sede;
  
            this.storageService.addDatos(this.newUsuario).then(dato=>{
              this.newUsuario = <DatosDocente>{};
              this.navController.navigateRoot('logindocente');
        
              this.showToast('Datos Guardados');
              this.loadDatos();
            });
  
  
  
  
          }
        }
      }
      else{
          this.newUsuario.nombre = form.nombre;
          this.newUsuario.rut = form.rut;
          this.newUsuario.email = form.email;
          this.newUsuario.contraseña = form.contraseña;
          this.newUsuario.sede = form.sede;

        this.storageService.addDatos(this.newUsuario).then(dato=>{
          this.newUsuario = <DatosDocente>{};
          this.navController.navigateRoot('logindocente');
    
          this.showToast('Datos Guardados');
          this.loadDatos();
        });
      }



      
    })
    
  }




  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos = datos;
    });
  }


  async alerta(msg){
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
    return;
  }




  /* addDatos(){
    this.newDato.modified = Date.now();
    this.newDato.id = Date.now();
    this.storageService.addDatos(this.newDato).then(dato=>{
      this.newDato = <DatosDocente>{};
      this.formularioRegistro.reset();
      this.navController.navigateRoot('logindocente')

      this.showToast('Datos Guardados');
      this.loadDatos();
    });
  } */

  updateDatos(dato:DatosDocente){
    dato.nombre = `UPDATED: ${dato.nombre}`;
    dato.modified = Date.now();
    this.storageService.updateDatos(dato).then(item=>{
      this.showToast('Datos Actualizados');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  deleteDatos(dato:DatosDocente){
    this.storageService.deleteDatos(dato.id).then(item=>{
      this.showToast('Datos Eliminados');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }




}

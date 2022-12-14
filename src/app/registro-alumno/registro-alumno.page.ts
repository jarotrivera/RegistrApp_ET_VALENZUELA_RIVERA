import { Component, OnInit,ViewChild } from '@angular/core';
import { ServicesDatosAlumnoService, DatosAlumno } from '../services/services-datos-alumno.service';
import {Platform, ToastController, IonList, NavController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,

} from '@angular/forms';


import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.page.html',
  styleUrls: ['./registro-alumno.page.scss'],
})
export class RegistroAlumnoPage implements OnInit {

  datos: DatosAlumno[] = [];
  newDatos: DatosAlumno = <DatosAlumno>{};
  @ViewChild('myList')myList: IonList;

  formularioRegistro: FormGroup;
  newUsuario: DatosAlumno = <DatosAlumno>{};


  alumnos : any[]=[]

  constructor(private storageService:ServicesDatosAlumnoService,
              private storage : Storage,
              private plt:Platform,private toastController:ToastController,
              private alertController:AlertController,
              private navController: NavController,
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("",Validators.required),
                  'apellido': new FormControl("",Validators.required),
                  'email': new FormControl("",Validators.required),
                  'contraseña': new FormControl("",Validators.required),
                  'sede': new FormControl("",Validators.required),
                  'jornada': new FormControl("",Validators.required),
                });
               }

  ngOnInit() {
    
  
   
}

/*   async crearUsuario(){
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
    this.newUsuario.apellido = form.apellido;
    this.newUsuario.email = form.email;
    this.newUsuario.password = form.contraseña;
    this.newUsuario.sede = form.sede;
    this.newUsuario.jornada = form.jornada;
    this.newUsuario.modified = Date.now();
    this.newUsuario.id = Date.now();
    this.storageService.addDatos(this.newUsuario).then(dato=>{
      this.newUsuario = <DatosAlumno>{};
      this.navController.navigateRoot('loginestudiante');
      this.showToast('Datos Guardados');
      this.loadDatos();
    });
  } */





  onSubmit(){
  }


  getDatos(): Promise<DatosAlumno[]> {
    return this.storage.get('my-datos-alumno');
  }

  addDato(){
    const form = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
      this.alerta('Debe completar todos los campos');
      return;
    }
    this.getDatos().then(datos=>{
      this.alumnos = datos;
      
      if(this.alumnos != null || this.alumnos != undefined){
        for(let i=0; i<this.alumnos.length; i++){
          if(this.alumnos[i].email == form.email){
            this.alerta('El email ya está registrado en el sistema');
            return;
          }
          else{
            this.newDatos.nombre = form.nombre;
            this.newDatos.apellido = form.apellido;
            this.newDatos.email = form.email;
            this.newDatos.password = form.contraseña;
            this.newDatos.sede = form.sede;
            this.newDatos.jornada = form.jornada;
  
            this.storageService.addDatos(this.newDatos).then(dato=>{
              this.newDatos = <DatosAlumno>{};
              this.navController.navigateRoot('loginestudiante');
        
              this.showToast('Datos Guardados');
              this.loadDatos();
            });
  
  
  
  
          }
        }
      }
      else{
        this.newDatos.nombre = form.nombre;
        this.newDatos.apellido = form.apellido;
        this.newDatos.email = form.email;
        this.newDatos.password = form.contraseña;
        this.newDatos.sede = form.sede;
        this.newDatos.jornada = form.jornada;

        this.storageService.addDatos(this.newDatos).then(dato=>{
          this.newDatos = <DatosAlumno>{};
          this.navController.navigateRoot('loginestudiante');
    
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


  /*  addDatos(){
    this.newDatos.modified = Date.now();
    this.newDatos.id = Date.now();    

    this.storageService.addDatos(this.newDatos).then(dato=>{
      this.newDatos = <DatosAlumno>{};
      this.navController.navigateRoot('loginestudiante');

      this.showToast('Datos Guardados');
      this.loadDatos();
    });
  } */

  updateDatos(dato:DatosAlumno){
    dato.nombre = 'Updated';
    dato.modified = Date.now();
    this.storageService.updateDatos(dato).then(dato=>{
      this.showToast('Datos Actualizados');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  deleteDatos(dato:DatosAlumno){
    this.storageService.deleteDatos(dato.id).then(dato=>{
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

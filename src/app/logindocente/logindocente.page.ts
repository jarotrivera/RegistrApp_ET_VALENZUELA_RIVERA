import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ServicesDatosService, DatosDocente } from '../services/services-datos.service';
import{
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-logindocente',
  templateUrl: './logindocente.page.html',
  styleUrls: ['./logindocente.page.scss'],
})
export class LogindocentePage implements OnInit {

  formularioLogin: FormGroup;
  docentes : DatosDocente[] = [];

  constructor(private alertController:AlertController,
              private navController: NavController,
              private registroService: ServicesDatosService,
              private fb:FormBuilder) {
                this.formularioLogin = this.fb.group({
                  'correo': new FormControl("",Validators.required),
                  'contraseña': new FormControl("",Validators.required),
                  'rut': new FormControl("",Validators.required),
               });
              }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a= 0;
    this.registroService.getDatos().then(datos=>{
      this.docentes=datos;
      if(datos.length==0)
      {
        return null;
      }
      for (let obj of this.docentes){
        if(obj.email==f.correo && obj.contraseña==f.contraseña && obj.rut== f.rut.toLowerCase())
        {
          a=1;
          console.log('ingresado')
          localStorage.setItem('ingresado-docente', 'true');
          localStorage.setItem('nombre-docente', obj.nombre);
          this.navController.navigateRoot('inicio-docente');
          
        }
      }
    console.log(a);
    if(a==0){
      this.alertMsg();
    }

    });
  }


  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

}

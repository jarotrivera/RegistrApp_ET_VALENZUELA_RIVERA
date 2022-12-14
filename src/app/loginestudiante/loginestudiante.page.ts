import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ServicesDatosAlumnoService,DatosAlumno } from '../services/services-datos-alumno.service';
import{
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-loginestudiante',
  templateUrl: './loginestudiante.page.html',
  styleUrls: ['./loginestudiante.page.scss'],
})
export class LoginestudiantePage implements OnInit {

  formularioLogin: FormGroup;
  alumnos : DatosAlumno[] = [];


  constructor(private alertController:AlertController,
    private navController: NavController,
    private registroService: ServicesDatosAlumnoService,
    private fb:FormBuilder) { 
      this.formularioLogin = this.fb.group({
        'correo': new FormControl("",Validators.required),
        'contraseña': new FormControl("",Validators.required),
     });
    }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a= 0;
    this.registroService.getDatos().then(datos=>{
      this.alumnos=datos;
      if(datos.length==0)
      {
        return null;
      }
      for (let obj of this.alumnos){
        if(obj.email==f.correo && obj.password==f.contraseña)
        {
          a=1;
          console.log('ingresado')
          localStorage.setItem('ingresado-alumno', 'true');
          localStorage.setItem('nombre-alumno', obj.nombre);
          this.navController.navigateRoot('inicio-alumno');
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

import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {Platform, ToastController, IonList, NavController} from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ServicesDatosAlumnoService, DatosAlumno } from '../services/services-datos-alumno.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,

} from '@angular/forms';

import { ActionSheetController } from '@ionic/angular';



import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http'
const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;



@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit{


  //variables para API
  weatherTemp :any
  todayDate = new Date()
  cityName :any
  weatherDetails:any


  //variables para modal
  @ViewChild('myList')myList: IonList;



  @ViewChild(IonModal) modal: IonModal;

  name: string;
  datos: DatosAlumno[] = [];

  formUpdate: FormGroup;

  constructor(private barcodeScanner: BarcodeScanner,private alertController:AlertController, public httpClient:HttpClient,
    private actionSheet: ActionSheetController,
    private storageService:ServicesDatosAlumnoService,
    private plt:Platform,private toastController:ToastController,
    private navController: NavController,
    private fb:FormBuilder) { 
    this.loaddata()
    this.formUpdate = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required),
    });
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      }).catch(err => {
        console.log('Error', err);
      });
  }

  
  //funciones para usar api y mostrar modal

  loaddata(){
    this.httpClient.get(`${API_URL}/weather?q=${"Santiago"}&lang=es&appid=${API_KEY}`).subscribe(results => {
      //console.log(results);
      this.weatherTemp = results['main']
      this.cityName = results['name']
      //console.log(this.weatherTemp);
      this.weatherDetails = results['weather'][0]
      //console.log(this.weatherDetails);
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }





  //----------------------------------------

  onSubmit(){
  }

  ngOnInit() {

  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheet.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };


  deslogear(){
    localStorage.removeItem('ingresado-alumno');
    localStorage.removeItem('nombre-alumno');
  }




  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  nombreAlumno = localStorage.getItem('nombre-alumno');

}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


export interface DatosDocente {
  id: number;
  nombre: string;
  rut: string;
  email: string;
  contraseña: string;
  sede: string;
  modified:number;
}

const DATOS_KEY = 'my-datos-docente';


@Injectable({
  providedIn: 'root'
})
export class ServicesDatosService {

  private _storage: Storage;

  constructor(private storage:Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async addDatos(dato: DatosDocente): Promise<any> {
    return this._storage.get(DATOS_KEY).then((datos:DatosDocente[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(DATOS_KEY, datos);
      }else{
        return this.storage.set(DATOS_KEY, [dato]);
      }
    });
  }

  getDatos(): Promise<DatosDocente[]> {
    return this.storage.get(DATOS_KEY);
  }

  async updateDatos(dato: DatosDocente): Promise<any> {
    return this.storage.get(DATOS_KEY).then((datos:DatosDocente[])=>{
      if(!datos || datos.length === 0){
        return null;
      }

      let newDatos: DatosDocente[] = [];

      for(let i of datos){
        if(i.id === dato.id){
          newDatos.push(dato);
        }else{
          newDatos.push(i);
        }
      }

      return this.storage.set(DATOS_KEY, newDatos);
    });
  }

  async deleteDatos(id: number): Promise<DatosDocente> {
    return this.storage.get(DATOS_KEY).then((datos:DatosDocente[])=>{
      if(!datos || datos.length === 0){
        return null;
      }

      let toKeep: DatosDocente[] = [];

      for(let i of datos){
        if(i.id !== id){
          toKeep.push(i);
        }
      }

      return this.storage.set(DATOS_KEY, toKeep);
    });
  }



}

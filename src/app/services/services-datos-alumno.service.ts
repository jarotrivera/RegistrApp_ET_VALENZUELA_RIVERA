import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


export interface DatosAlumno{
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  sede: string;
  jornada: string;
  modified:number;
}

const DATOS_KEY = 'my-datos-alumno';

@Injectable({
  providedIn: 'root'
})
export class ServicesDatosAlumnoService {

  private _storage: Storage;

  constructor(private storage:Storage) {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async addDatos(dato: DatosAlumno): Promise<any> {
    return this._storage.get(DATOS_KEY).then((datos:DatosAlumno[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(DATOS_KEY, datos);
      }else{
        return this.storage.set(DATOS_KEY, [dato]);
      }
    });
  }

  getDatos(): Promise<DatosAlumno[]> {
    return this.storage.get(DATOS_KEY);
  }

  async updateDatos(dato: DatosAlumno): Promise<any> {
    return this.storage.get(DATOS_KEY).then((datos:DatosAlumno[])=>{
      if(!datos || datos.length === 0){
        return null;
      }

      let newDatos: DatosAlumno[] = [];

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

  async deleteDatos(id: number): Promise<DatosAlumno> {
    return this.storage.get(DATOS_KEY).then((datos:DatosAlumno[])=>{
      if(!datos || datos.length === 0){
        return null;
      }

      let toKeep: DatosAlumno[] = [];

      for(let i of datos){
        if(i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(DATOS_KEY, toKeep);
    });
  }


}

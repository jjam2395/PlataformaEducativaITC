import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UsuarioAlumnoService {
  uid:string; 
  car:any;
  constructor(private db: AngularFireDatabase) {
    if(localStorage.getItem('user')){
      this.uid=JSON.parse(localStorage.getItem('user')).uid;
    } 
    
  }

  saveUser(uid, data,tipoUserCrear){
    //REFERENCIA A LA DATABASE
    console.log("tipo de usuario desde el servicio",tipoUserCrear)
    let refUser=this.db.list('/usuarios/'+tipoUserCrear+"/");
    //SE ACTUALIZA LA INFORMACION EN USUARIOS CON LA KEY UID
    refUser.update(uid,data);
  }

  getDatoUser(dato){
    let carrera = this.db.object('/usuarios/'+this.uid+"/"+dato,{ });
    return carrera;
  }

  

}

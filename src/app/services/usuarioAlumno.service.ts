import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UsuarioAlumnoService {
  uid:string;
  car:any;
  user:any;
  constructor(private db: AngularFireDatabase) {
    if(localStorage.getItem('user')){
      this.uid=JSON.parse(localStorage.getItem('user')).uid;
      console.log("uid del usuario logeado ",this.uid)
    }

  }

  saveUser(uid, data,tipoUserCrear){
    //REFERENCIA A LA DATABASE
    console.log("tipo de usuario desde el servicioooo",tipoUserCrear)
    let refUser=this.db.list('/usuarios/'+tipoUserCrear+'/');
    // SE ACTUALIZA LA INFORMACION EN USUARIOS CON LA KEY UID
    refUser.update(uid,data);
  }

  getDatoUser(dato){
    console.log("dato desde el servicio",dato)
    console.log("usuario desde el servicio", this.uid)
    let carrera = this.db.object('/usuarios/alumnos/'+this.uid+'/'+dato,{ });
    console.log("carrera obtenida desde el servicio",carrera);
    return carrera;
  }

  getUser(tipoUser, uid){
    let user = this.db.object('/usuarios/'+tipoUser+'/'+uid,{});
    return user;
  }



}

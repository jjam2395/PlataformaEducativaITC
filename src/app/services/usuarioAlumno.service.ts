import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UsuarioAlumnoService {
  uid:string; 

  constructor(private db: AngularFireDatabase) { 
    this.uid=JSON.parse(localStorage.getItem('user')).uid;
  }

  saveUser(uid, data){
    //REFERENCIA A LA DATABASE
    let refUser=this.db.list('/usuarios/');
    //SE ACTUALIZA LA INFORMACION EN USUARIOS CON LA KEY UID
    refUser.update(uid,data);
  }

  getDatoUser(dato){
    console.log(dato);
    const queryList = this.db.list(`/usuarios/${this.uid}/dato`);
    return queryList;
  }

  

}

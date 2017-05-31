import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class CrudFirebaseService {

  constructor(private db: AngularFireDatabase) {
   }

  //GUARDAR DATOS BASICOS DEL USUARIO
  saveUser(uid, data){
    //REFERENCIA A LA DATABASE
    let refUser=this.db.list('/usuarios/');
    
    //SE ACTUALIZA LA INFORMACION EN USUARIOS CON LA KEY UID
    refUser.update(uid,data);
  }

  getMaterias(){
    
  }
}

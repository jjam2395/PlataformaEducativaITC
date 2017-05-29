import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class CrudFirebaseService {

  constructor(private db: AngularFireDatabase) {
   }

  //GUARDAR DATOS BASICOS DEL USUARIO
  saveUser(result, nombre){
    let refUser=this.db.list('/usuarios/');
    let data={
      displayName: nombre,
      email: result.email==null ? '' : result.email,
      photoURL: result.photoURL==null ? '' : result.photoURL 
    }
    refUser.update(result.uid,data);
  }
}

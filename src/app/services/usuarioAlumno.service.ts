import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class UsuarioAlumnoService {
  uid:string; 
  car:any;
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
    // let t=this
    // var carrera = firebase.database().ref('usuarios/' + this.uid + "/"+dato);
    // carrera.on('value', function(snapshot) {
    //   // updateStarCount(postElement, snapshot.val());
    //   t.car= snapshot.val();
    // });

    // console.log("carrera desde compon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ente",this.car);
    let carrera
    carrera = this.db.list('/usuarios/'+this.uid,{
      // query:{
      //   orderByKey:true
      // }
    });

    return carrera;
  }

  

}

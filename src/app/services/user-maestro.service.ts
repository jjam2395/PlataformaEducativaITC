import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserMaestroService {
  uidMaestro:string;
  constructor( private db:AngularFireDatabase) {
    this.uidMaestro=JSON.parse(localStorage.getItem('user')).uid;
   }

  guardarCurso(uidCurso,curso){
    let carrera=curso.carrera;
    let refUser=this.db.list('/usuarios/maestros/'+this.uidMaestro+'/cursos/');
    refUser.update(uidCurso,{uidCurso,carrera});
  }

  getCursos(){
    let refCursos=this.db.list('/usuarios/maestros/'+this.uidMaestro+'/cursos/');
    return refCursos;
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {Curso} from '../interfaces/curso.interface';


@Injectable()
export class CursosService {
  // refCursos: FirebaseListObservable<any[]>
  cursos;
  constructor( private db:AngularFireDatabase) { }

  nuevoCurso(curso){
    let refCurso=this.db.list('/cursos/'+curso.carrera);
    let data={
      nombre:curso.nombre,
      objetivo:curso.objetivo,
      descripcion:curso.descripcion,
      instructores:curso.instructores,
      modulos:curso.modulos,
    }
    refCurso.push(data);
    // let cursosURL:string ="https://plataformaeducativaitc.firebaseio.com/cursos/curso.carrera.json/curso.json";

    // let body = JSON.stringify(curso);
    // let headers = new Headers({
    //   'content-Type':'aplicacttion/json'
    // });
    // return this.http.post(cursosURL, body, {headers})
    //   .map(res=>{
    //     console.log(res.json());
    //     return res.json();
    //   })
  }

  cargarCursos(carrera){

    //REFERENCIA A LA BD CON LA CARRERA CORRESPONDIENTE
    let  refCursos=firebase.database().ref(`/cursos/${carrera}`);
    let cursos=[];
    let t=this;
    refCursos.on('value', function(snapshot) {
      //DEVUELVE EL NOMBRE DE LAS PROPIEDADES DEL OBJETO
      // keys=Object.getOwnPropertyNames(snapshot.val()).sort()
      // console.log(snapshot.val()[keys[0]]);
      let objTemp=snapshot.val();
      for (let obj in objTemp) {
          cursos.push(objTemp[obj]);
      }
      t.cursos=cursos;
      console.log(t.cursos);
    });
  }
}

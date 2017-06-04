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
    let key=refCurso.push(data).key;
    return key;
  }

  cargarCursos(carrera){
    console.error("entro a la funcion de cargar cursos");
    // REFERENCIA A LA BD CON LA CARRERA CORRESPONDIENTE
    // console.log("carrera desde cargar cursos service")
    // let  refCursos=firebase.database().ref('/cursos/'+carrera);
    this.cursos = this.db.list('/cursos/'+carrera,{ });
    console.log("cursos desde el servicio",this.cursos)
    return this.cursos
    

    // let cursos=[];
    // let t=this;
    // refCursos.on('value', function(snapshot) {
    //   //DEVUELVE EL NOMBRE DE LAS PROPIEDADES DEL OBJETO
    //   // keys=Object.getOwnPropertyNames(snapshot.val()).sort()
    //   // console.log(snapshot.val()[keys[0]]);
    //   let objTemp=snapshot.val();
    //   for (let obj in objTemp) {
    //       cursos.push(objTemp[obj]);
    //   }
    //   t.cursos=cursos;
    //   console.log("cursos desde el servicio cursos",t.cursos);
    // });
  }
}

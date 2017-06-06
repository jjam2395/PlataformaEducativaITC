import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import {Curso} from '../interfaces/curso.interface';


@Injectable()
export class CursosService {
  // refCursos: FirebaseListObservable<any[]>
  curso;
  cursos;
  estadoSubida;
  // urlVideo;
  constructor( private db:AngularFireDatabase) { }

  nuevoCurso(curso){
    // console.log("curso desde el srvicio",curso)
    let refCurso=this.db.list('/cursos/'+curso.carrera);
    let data={
      nombre:curso.nombre,
      objetivo:curso.objetivo,
      descripcion:curso.descripcion,
    }
    let key=refCurso.push(data).key;
    // console.log("key desde el servicio de curso",key)
    return key;
  }

  cargarCurso(carrera,keyCurso){
    this.curso = this.db.list('/cursos/'+carrera+'/'+keyCurso);
    console.log("sirvio el service");
    return this.curso;
  }

  cargarCursos(carrera){
    // REFERENCIA A LA BD CON LA CARRERA CORRESPONDIENTE
    this.cursos = this.db.list('/cursos/'+carrera,{ });
    console.log("cursos desde el servicio",this.cursos)
    return this.cursos
  }

  subirArchivo(file,carrera, newCursoKey, titulo){
    //SE LE CAMBIA EL NOMBRE AL ARCHIVO CON EL QUE INGRESO EL USUARIO
    file.nombre=titulo;
    console.log(file);
    let storageRef = firebase.storage().ref('cursos/'+carrera+'/'+newCursoKey+'/videos/'+file.nombre+'/');
    let t=this;
    let task = storageRef.put(file);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
             t.estadoSubida = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        },(error)=>{
            t.estadoSubida=`ha ocurrido un error ${error.message}`;
            console.log("estado de la subida",this.estadoSubida);
        },()=>{
            // firebase.database().ref('Documentos/'+this.props.user.displayName).push({
            //     titulo :file.name,
            //     downloadURL: task.snapshot.downloadURL
            // });
            t.estadoSubida="Se ha completado la subida del archivo";
            console.log("archivo subido");
            let urlVideo=task.snapshot.downloadURL;
            //GUARDAR LA URL DEL VIDEO EN LA BASE DE DATOS
            //REFERENCIA: CURSOS/CARRERA/KEYCURSO/MODULOS/NOMBREMODULO/VIDEOS||ACTIVIDADES
            let refvideo=this.db.list('/cursos/'+carrera+'/'+newCursoKey+'/modulos/');
            refvideo.push({urlVideo});
        })
  }
}

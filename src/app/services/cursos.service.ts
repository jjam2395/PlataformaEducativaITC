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
  uidMaestro; //UID DEL MAESTRO QUE ESTA LOGEADO
  // urlVideo;
  constructor( private db:AngularFireDatabase) {
    //this.uidMaestro=JSON.parse(localStorage.getItem('user')).uid;
   }

  nuevoCurso(curso){
    // console.log("curso desde el srvicio",curso)
    let refCurso=this.db.list('/cursos/'+curso.carrera);
    let data={
      nombre:curso.nombre,
      maestro:this.uidMaestro,
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

  cargarCursosGeneral(){
    this.cursos = this.db.object('/cursos/')
    return this.cursos;
  }

  cargarCursos(carrera){
    // REFERENCIA A LA BD CON LA CARRERA CORRESPONDIENTE
    this.cursos = this.db.list('/cursos/'+carrera,{ });
    console.log("cursos desde el servicio",this.cursos)
    return this.cursos
  }

  gedDato(carrera, key, dato){
    let resultado = this.db.object('cursos/'+carrera+'/'+key+'/'+dato,{});
    return resultado;
  }

  getVideos(carrera, key, nombreModulo){
    let resultado =this.db.list('cursos/'+carrera+'/'+key+'/modulos/videos/'+nombreModulo,{})
    return resultado;
  }
  subirArchivo(file:File,curso,modulo:string, newCursoKey:string, titulo:string){
    //SE LE CAMBIA EL NOMBRE AL ARCHIVO CON EL QUE INGRESO EL USUARIO
    let t=this;
    //REFERENCIA AL STORAGE
    let storageRef = firebase.storage().ref('cursos/'+curso.carrera+'/'+newCursoKey+'/modulos/videos/'+modulo+'/'+titulo+'/');
    //SE ASIGNA LA TAREA DE SUBIR EL ARCHIVO
    let task = storageRef.put(file);
    //SE CREA UN SOCKET SOBRE LA TAREA
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
             t.estadoSubida = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        },(error)=>{
            t.estadoSubida=`ha ocurrido un error ${error.message}`;
            console.log("estado de la subida",this.estadoSubida);
        },()=>{
          console.log("El archivo se ha subido con exito");

            t.estadoSubida="Se ha completado la subida del archivo";
            console.log("archivo subido");
            //URL DEL VIDEO
            let urlVideo=task.snapshot.downloadURL;
            //GUARDAR LA URL DEL VIDEO EN LA BASE DE DATOS
            //REFERENCIA: CURSOS/CARRERA/KEYCURSO/MODULOS/NOMBREMODULO/VIDEOS||ACTIVIDADES
            let refvideo=this.db.list('/cursos/'+curso.carrera+'/'+newCursoKey+'/modulos/videos/'+modulo+'/');
            refvideo.push({urlVideo});
        })
  }
}

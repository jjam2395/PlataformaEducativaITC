import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import {Curso} from '../interfaces/curso.interface';


@Injectable()
export class CursosService {
  // refCursos: FirebaseListObservable<any[]>
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

  subirArchivo(file,carrera, newCursoKey){
    console.log("carrera desde el servicio",carrera);
    let storageRef = firebase.storage().ref('cursos/'+carrera+'/videos/'+file.name+'/');
    let t=this;
    let task = storageRef.put(file);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
             t.estadoSubida = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            // console.log(this.estadoSubida);
            // this.estadoSubida={uploadValue:porcentaje}
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
            let refvideo=this.db.list('/cursos/'+carrera+'/'+newCursoKey+'/modulos/videos/');
            refvideo.update(urlVideo,{urlVideo});
        })
  }
}

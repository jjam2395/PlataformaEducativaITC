import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import {Curso} from '../interfaces/curso.interface';
import 'rxjs/Rx';

@Injectable()
export class CursosService {

  cursosURL:string ="https://plataformaeducativaitc.firebaseio.com/cursos.json"

  constructor( private http:Http) { }

  nuevoCurso(curso:Curso){
    let body = JSON.stringify(curso);
    let headers = new Headers({
      'content-Type':'aplicacttion/json'
    });
    return this.http.post(this.cursosURL, body, {headers})
      .map(res=>{
        console.log(res.json());
        return res.json();
      })
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Curso} from '../interfaces/curso.interface';

@Injectable()
export class CursosService {

  cursosURL:string ="https://plataformaeducativaitc-50026.firebaseio.com/cursos.json"

  constructor( private http:Http) { }

  nuevoCurso(curso:Curso){

  }
}

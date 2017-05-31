export interface Curso{
  nombre:string;
  objetivo:string;
  descripcion:string;
  carrera: string;
  instructores:Array<string>;
  modulos?:Array<string>;
  key$?:string;
}

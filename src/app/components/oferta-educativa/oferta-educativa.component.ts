import { Component, OnInit } from '@angular/core';
import {CursosService} from '../../services/cursos.service';

@Component({
  selector: 'app-oferta-educativa',
  templateUrl: './oferta-educativa.component.html',
  styleUrls: ['./oferta-educativa.component.css']
})
export class OfertaEducativaComponent implements OnInit {

  constructor(private _cs:CursosService) {
    this._cs.cargarCursosGeneral()
    .subscribe((cursos)=>{
      console.log("se cargaron los cursos en general",cursos);
    })

  }

  ngOnInit() {
  }

}

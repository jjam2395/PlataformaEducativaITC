import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.chips').material_chip();

    $('.chips').on('chip.add', function(e, chip){
    // you have the added chip here
    });
  }

}

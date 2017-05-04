import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
	nameUser: String;
	materias: Array<String>;
  constructor() { 
  	this.nameUser="Rodrigo Reyes Cazares";
  	this.materias=["Base de datos","Dispositivos Moviles","Inteligencia Artificial"];
  }

  ngOnInit() {
  }

}

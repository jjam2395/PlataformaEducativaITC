import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
	nameUser: String;
	materias: Array<String>;
  constructor(private _ls: LoginService,  private router:Router) {
  	this.nameUser="localStorage.user.displayName";
  	this.materias=["Base de datos","Dispositivos Moviles","Inteligencia Artificial"];
  }

  ngOnInit() {
  }

  logout(){
    this._ls.logout();
    this.router.navigate(['/home']);
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { UsuarioAlumnoService } from '../../../services/usuarioAlumno.service';
import { CursosService } from '../../../services/cursos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  nameUser: String;
  carreraUser: String;
	materias: Array<String>;
  keycursos:Array<String>;

  constructor(private _ls: LoginService, private _ua:UsuarioAlumnoService, private _cu:CursosService,  private router:Router) {
  	this.nameUser="localStorage.user.displayName";
  	this.materias=["Base de datos","Dispositivos Moviles","Inteligencia Artificial"];
    this.keycursos=[];
    let userUid=JSON.parse(localStorage.getItem('user')).uid;
    this._ua.getUser(localStorage.getItem('tipoUserLogeado'),userUid)
    .subscribe( (user)=>{
      console.log("Usuario Cargado..");
      console.log("emm:",(user.cursos.$key));
      let i=0;
      for (let curso in user.cursos){
        console.log(curso);
        this.keycursos[i]=curso;

        console.log("prueba",this.keycursos[i]);
        this._cu.cargarCurso(user.carrera,this.keycursos[i])
        .subscribe((curso)=>{
          console.log("alfin wn:",curso)
        })

        i++;
      }


      this.nameUser=user.displayName;
      this.carreraUser=user.carrera;
    });

    for (let curso in this.keycursos)
    {
      console.log(this.keycursos[curso]);

    }




  }

  ngOnInit() {
  }

  logout(){
    this._ls.logout();
    this.router.navigate(['/home']);
  }

}

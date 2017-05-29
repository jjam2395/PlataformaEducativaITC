import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  forma:FormGroup; //Registro

  constructor(private _ls: LoginService, private router:Router) {
      
     this.forma = new FormGroup({
        'email': new FormControl('',[Validators.required, Validators.pattern("[0-9]{8}@itcuautla\.edu\.mx")]),
        'nombre': new FormControl('',Validators.required),
        'carrera': new FormControl('',Validators.required),
        'password': new FormControl('',[Validators.required, Validators.minLength(8)])
      });
   }

  ngOnInit() {
    $('select').material_select();
    this._ls.user.subscribe((result)=>{
      console.log(result);
    });
  }

  registrar(){
    console.log(this.forma.value);
    // this._ls.registrar(this.forma.value.email, this.forma.value.password, this.forma.value.nombre);
  }

}

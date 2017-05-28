import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


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
        'password': new FormControl('',[Validators.required, Validators.minLength(8)])
      });
   }

  ngOnInit() {
    this._ls.user.subscribe((result)=>{
      console.log(result);
    });
  }

  registrar(){
    this._ls.registrar(this.forma.value.email,this.forma.value.password);
  }

}

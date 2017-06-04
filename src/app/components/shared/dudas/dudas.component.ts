import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { DudasService } from '../../../services/dudas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dudas',
  templateUrl: './dudas.component.html',
  styleUrls: ['./dudas.component.css']
})
export class DudasComponent implements OnInit {
  formDuda:FormGroup;
  data:any;
  constructor(private _ds: DudasService, private router:Router) {

    this.formDuda = new FormGroup({
      'correo': new FormControl('',[Validators.required, Validators.pattern("[0-9]{8}@itcuautla\.edu\.mx")]),
      'duda': new FormControl('',[Validators.required, Validators.minLength(10)]),
    });

   }

  ngOnInit() {
  }


  enviarDuda(){
  if(this.formDuda.valid){
    this._ds.enviarDuda(this.formDuda.value.correo,this.formDuda.value.duda);
  }else{
    console.log("formulario invalido")
  }





}
}

import { Component, OnInit } from '@angular/core';
import { DudasService } from "../../services/dudas.service";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

@Component({
  selector: 'app-dudas-responder',
  templateUrl: './dudas-responder.component.html',
  styleUrls: ['./dudas-responder.component.css']
})
export class DudasResponderComponent implements OnInit {
  formRDuda:FormGroup;

  constructor(private _ds:DudasService) {

    this._ds.cargarDudas()
    .subscribe( ()=>{
      console.log("Dudas Cargadas..");
    })

    this.formRDuda = new FormGroup({
      'respuesta': new FormControl('',[Validators.required, Validators.minLength(10)]),
      'key': new FormControl()
    });
  }

  ngOnInit() {
  }
  responderDuda(){
    if(this.formRDuda.valid){
      console.log("entra funcion responder");
      let key = this.formRDuda.value.key
      let data={
        respuesta: this.formRDuda.value.respuesta
      }
      console.log("se mandara la respuesta");
      this._ds.responderDuda(key,data);
  }
  else{
    console.log("formulario invalido");
  }
}


}

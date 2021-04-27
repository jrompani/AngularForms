import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ValidatorError{
  [s: string]: boolean 
}


@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }


  //regreso un objeto
  noApellido( control: FormControl): { [s: string]: boolean }{
    
    if( control.value?.toLowerCase() === 'apellido'){
      return {
        noApellido: true
      }
    }

    return null;
  }

  passwordEqual(password1: string, password2: string){
    //recibo un formGroup en el cual estoy usando la validacion
    return ( formGroup: FormGroup ) =>{
      const pass1Control = formGroup.controls[password1]; 
      const pass2Control = formGroup.controls[password2];

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true})
      }
    }
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any>{
    
    //si no existe ningun valor retorno null
    if(!control.value){
      return Promise.resolve(null)
    }


    return new Promise( (resolve, reject) => {
      setTimeout( () => {
          if(control.value === 'hola' ){
            resolve({ existe:true})
          }else{
            resolve(null)
          }
      }, 1000);
    })
  }


}

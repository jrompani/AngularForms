import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private formGroup: FormBuilder, private validadores: ValidacionesService) {
    this.crearFormulario();
    //this.loadData();
    this.crearListenersFormulario();
    console.log(this.forma.controls);
   }

  ngOnInit(): void {
  }


  get nombreInvalid(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoInvalid(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get emailInvalid(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').untouched
  }

  get calleInvalid(){
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched
  }

  get partidoInvalid(){
    return this.forma.get('direccion.partido').invalid && this.forma.get('direccion.partido').touched
  }

  get ciudadInvalid(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }


  //getter para retornar los pasatiempos y poder utilizarlos en el html
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  
  get pass1Invalid(){
    return this.forma.get('password1').invalid && this.forma.get('password1').touched
  }
  
  get pass2Invalid(){
    const pass1 = this.forma.get('password1').value;
    const pass2 = this.forma.get('password2').value;

    return (pass1 === pass2) ? false : true;
  }


  
  crearFormulario(){
    this.forma = this.formGroup.group({
      nombre: ['', [Validators.required, Validators.minLength(6), Validators.nullValidator]],
      apellido: ['', [Validators.required, Validators.minLength(6), Validators.nullValidator, this.validadores.noApellido]],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      email: ['', [Validators.required, Validators.nullValidator, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario: ['', , this.validadores.existeUsuario], //no mando argumentos porque esta validacion manda todo el control y yo solo necesito usar el control
      direccion: this.formGroup.group({
        partido:['', Validators.required],
        ciudad:['', Validators.required],
        calle: ['', Validators.required]
      }),
      pasatiempos: this.formGroup.array([])
    },{

    validators: this.validadores.passwordEqual('password1', 'password2')
  });
  }


  crearListenersFormulario(){
    /* this.forma.valueChanges.subscribe( valor => {
      console.log(valor)
    })

    this.forma.statusChanges.subscribe( x => {
      console.log( { x })
    }) */
  }


  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }


  agregarPasatiempo(){
    this.pasatiempos.push( this.formGroup.control('', Validators.required))
  }


  guardar(){
    console.log(this.forma);


    //Valido si el formulario es invalido, obtengo los controles de los input y luego verifico si son instancias de formGroup
    //si lo son, por cada control obtengo los controls hijos y los marco como tocados
    if(this.forma.invalid){
      return Object.values( this.forma.controls).forEach( control => {

        if( control instanceof FormGroup){
          Object.values( control.controls).forEach( control => control.markAsTouched() );
          }else{
            control.markAsTouched();
          }
      
    });
  }

  this.resetForm();
}


resetForm(){
  this.forma.reset();
}

// loadData(){
//   //se puede utilizar el getValue
//   this.forma.reset({
//     nombre: 'Nombre Ejemplo',
//     apellido: 'Apellido Ejemplo',
//     email: 'correo@asd.com',
//     direccion: {
//       partido: 'Partido Ejemplo',
//       ciudad: 'Ciudad Ejemplo',
//       calle: 'Calle Ejemplo'
//     }
//   });
// }

}


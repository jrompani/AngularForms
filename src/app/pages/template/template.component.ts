import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  paises: any[]= [];

  usuario= {
    nombre: '',
    apellido: '',
    email: '',
    pais: '',
    genero: ''
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe( pais => {
      this.paises = pais;

      this.paises.unshift({
        nombre: '[Seleccione un pais]',
        codigo: ''
      })
    });
  }


  guardar(forma: NgForm){
    console.log(forma);
    if( forma.invalid){
     
      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      })
    }
    return;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent {

    evento!:FormGroup;
    constructor( ){
        this.evento = new FormGroup({
            id: new FormControl(crypto.randomUUID()),
            nome_evento: new FormControl(''),
            descricao: new FormControl(''),
            data_criacao: new FormControl(new Date()),
            endereco: new FormControl(''),
            preco_ingresso: new FormControl(),
            tipo_evento: new FormControl('festa'),
            status: new FormControl(false),
            data_evento: new FormControl(''),
            image: new FormControl('')
        })
    }

    salvarEvento(){
        console.log(this.evento.value)
    }
    cancelar(){
        console.log("Cancela")
    }
    
}


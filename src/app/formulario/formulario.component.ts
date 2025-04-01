import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent {
    nome_evento: string;
    id: string;
    descricao: string;
    data_criacao: Date;
    endereco: string;
    preco_ingresso: number;
    tipo_evento: string;
    status: boolean;
    data_evento: Date;

    constructor() {
        this.nome_evento = "";
        this.descricao = "";
        this.preco_ingresso = 0;
        this.endereco = "";
        this.tipo_evento = "";
        this.status = false;
        this.data_evento = new Date();
        this.id = crypto.randomUUID();
        this.data_criacao = new Date();
    }
}

const evento = new FormularioComponent();
evento.nome_evento = "Show do Coldplay";
evento.descricao = "Concerto de rock internacional";
evento.endereco = "Estádio do Maracanã, RJ";
evento.preco_ingresso = 250.00;
evento.tipo_evento = "Show";
evento.data_evento = new Date("2024-12-15");

console.log(evento);



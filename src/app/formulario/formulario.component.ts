import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Eventos } from './evento';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  evento!: FormGroup;

  constructor(private supabaseService: SupabaseService) {
    this.evento = new FormGroup({
      evento_ID: new FormControl(crypto.randomUUID()),
      nome_evento: new FormControl(''),
      descricao: new FormControl(''),
      data_criacao: new FormControl(new Date()),
      endereco: new FormControl(''),
      preco_ingresso: new FormControl(),
      tipo_evento: new FormControl('festa'),
      status: new FormControl(false),
      data_evento: new FormControl(''),
      image: new FormControl('')
    });
  }

  async salvarEvento() {
    const novoEvento: Eventos = this.evento.value;
    try {
      await this.supabaseService.salvarEvento(novoEvento);
      console.log('Evento salvo com sucesso!');
      this.evento.reset(this.evento);
    } catch (error) {
      console.error('Erro ao salvar o evento:', error);
    }
  }

  cancelar() {
    console.log("Cancela");
  }
}

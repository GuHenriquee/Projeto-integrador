import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Eventos } from './evento';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginaEventoComponent } from '../pagina-evento/pagina-evento.component';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PaginaEventoComponent, CabecalhoComponent, CabecalhoComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  evento!: FormGroup;



  constructor(private supabaseService: SupabaseService, private router: Router) {
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
        const { data, error } = await this.supabaseService.salvarEvento(novoEvento);
        if (error) {
          throw error;
        }
    
        const eventoId = data.evento_ID; // pega o ID do evento salvo
        console.log('Evento salvo com sucesso!', data);
        // ✅ Redireciona para a tela de detalhes
        this.router.navigate(['/evento', eventoId]);
    
      } catch (error) {
        console.error('Erro ao salvar o evento:', error);
      }
    }


  aoSelecionarArquivo(event: any){
    const file: File = event.target.files[0];
    if (file){
        this.lerArquivo(file);
    }
  }

  lerArquivo(file: File){
    const reader = new FileReader();
    reader.onload = () =>{
        if(reader.result){
            this.evento.get('image')?.setValue(reader.result)
        }
    }
    reader.readAsDataURL(file) /*Converte a imagem para base64*/
}


  cancelar() {
    console.log("Cancela");
  }

}



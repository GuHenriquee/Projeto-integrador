import { Component, NgModule, OnInit } from '@angular/core';
import { CabecalhoComponent } from "../../cabecalho/cabecalho.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormularioComponent } from '../formulario-evento/formulario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-evento',
  standalone: true,
  imports: [CabecalhoComponent, RouterLink, FormularioComponent, CommonModule],
  templateUrl: './pagina-evento.component.html',
  styleUrl: './pagina-evento.component.css'
})
export class PaginaEventoComponent  {
    evento: any;

    
    constructor(
        private route: ActivatedRoute,
        private supabaseService: SupabaseService
    ){  
    }

    ngOnInit() {
        this.pegarEventoPorId
}



pegarEventoPorId(){
    const id = this.route.snapshot.paramMap.get('id');
      
        if (id) {
          this.supabaseService.getEventoById(id).then(({ data, error }) => {
            if (error) {
              console.error('Erro ao buscar evento:', error.message);
            } else {
              this.evento = data;
              console.log(data)
            }
          });
        }
      }
    

}

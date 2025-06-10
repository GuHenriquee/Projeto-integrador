import { Component, NgModule, OnInit } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    evento: any = null;

    
    constructor(
        private route: ActivatedRoute,
        private supabaseService: SupabaseService,
        private router: Router
    ){  
    }

    ngOnInit() {
        this.pegarEventoPorUrl();
}


pegarEventoPorUrl(){
    const UrlDoEvento = this.route.snapshot.paramMap.get('UrlDoEvento');
        if (UrlDoEvento) {
          this.supabaseService.getEventoByUrl(UrlDoEvento).then(({ data, error }) => {
            if (error) {
              console.error('Erro ao buscar evento:', error.message);
            } else {
              this.evento = data;
              console.log(data)
            }
          });
        }
      }

paginaPagamento(){
    const UrlDoEvento = this.route.snapshot.paramMap.get('UrlDoEvento');
    this.router.navigate(['/pagamento', UrlDoEvento]);
}
}
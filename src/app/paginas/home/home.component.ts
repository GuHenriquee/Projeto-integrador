import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CabecalhoComponent, CabecalhoComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  estaLogado = false;

  constructor(private supabaseService: SupabaseService) {}
  async ngOnInit() {
    this.estaLogado = await this.supabaseService.isUserAuthenticated();
    if (this.estaLogado) {
      console.log('Usuário está logado');
    } else {
      console.log('Usuário NÃO está logado');
    }
  }

}


import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
    abrirModal(): void {
        const modal = document.getElementById('modalLogin');
        if (modal) {
        modal.style.display = 'block';
        }
    }

    fecharModal(): void {
        const modal = document.getElementById('modalLogin')
        if (modal){
            modal.style.display = 'none';
        }
  }

    constructor(private supabaseService: SupabaseService){}
    estaLogado = false;
     async logout() {
        
    try {
      await this.supabaseService.signOut();
    } catch (error) {
      console.error('Erro ao deslogar', error);
    }
    this.estaLogado = await this.supabaseService.isUserAuthenticated();
    if (this.estaLogado) {
      console.log('Usuário está logado');
    } else {
      console.log('Usuário NÃO está logado');
    }
  }
}

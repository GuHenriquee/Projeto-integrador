import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
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

    authForm: FormGroup;
    isLogin: boolean = true;

constructor(private fb: FormBuilder,
      private supabaseService: SupabaseService,
      private router: Router){
        this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]]
      });
    }


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
  
    async onSubmit() {
    const email = this.authForm.value.email;
    const senha = this.authForm.value.senha;
  
    console.log('Email:', email);
  console.log('Senha:', senha);
    try {
      const { data, error } = await this.supabaseService.signIn(email, senha);
  
      if (error) {
        throw error;
      }
  
      console.log('Login bem-sucedido!', data);
      this.router.navigate(['/home']); // Redirecione se necessário
    } catch (err: any) {
      console.error('Erro de autenticação:', err.message || err);
      // Aqui você pode exibir um alerta ou mensagem de erro ao usuário
    }
  }
  
    alternarModo() {
      this.isLogin = !this.isLogin;
    }

}



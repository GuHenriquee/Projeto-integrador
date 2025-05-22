import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CabecalhoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginCadastroComponent {
  authForm: FormGroup;
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
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

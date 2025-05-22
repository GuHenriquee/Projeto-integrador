import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CabecalhoComponent } from '../../components/cabecalho/cabecalho.component';
import { PaginaEventoComponent } from '../pagina-evento/pagina-evento.component';
import { SupabaseService } from '../../services/supabase.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PaginaEventoComponent, CabecalhoComponent, CabecalhoComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  private carteiraCounter = 1;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.cadastroForm = new FormGroup({
      usuario_ID: new FormControl(crypto.randomUUID()),
      nome:         new FormControl(''),
      email:        new FormControl(''),
      senha:        new FormControl(''),
      endereco:     new FormControl(''),
      tipo_usuario: new FormControl(''),
      carteira: new FormControl(this.carteiraCounter),
      data_criacao_usuario: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {
    // Se precisar de inicializações adicionais, faça aqui
  }

  /** Dispara quando o usuário clica em “Cadastrar” */
  async cadastrarUsuario() {
  if (this.cadastroForm.invalid) {
    this.cadastroForm.markAllAsTouched();
    return;
  }

  const novoUsuario: Usuario = this.cadastroForm.value;

  try {
    // 1. Cadastro no Supabase Auth (signUp)
    const { data: signUpData, error: signUpError } = await this.supabaseService.signUp(
      novoUsuario.email,
      novoUsuario.senha
    );

    if (signUpError) throw signUpError;

    // 2. Salva os dados adicionais no banco (ex: nome, carteira...)
    const { data, error } = await this.supabaseService.salvarUsuario(novoUsuario);
    if (error) throw error;

    // 3. Redireciona após sucesso
    this.router.navigate(['/home']);
  } catch (err: any) {
    console.error('Erro ao cadastrar usuário:', err.message || err);
  }
}

  /** Dispara quando o usuário clica em “Cancelar” */
  cancelarCadastro() {
    this.cadastroForm.reset({
      usuario_ID: crypto.randomUUID(),
      data_criacao: new Date()
    });
  }
}

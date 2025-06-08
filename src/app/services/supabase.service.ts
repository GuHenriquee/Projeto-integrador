import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthError, Session, User } from '@supabase/supabase-js';
import { Eventos } from '../paginas/formulario-evento/evento';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../paginas/cadastro/usuario';


@Injectable({
    providedIn: 'root',
  })
  export class SupabaseService {

    private supabase: SupabaseClient;
  
    constructor() {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  
    async salvarEvento(evento: Eventos) {
        return await this.supabase
          .from('tabela_eventos')
          .insert([evento])
          .select() // ⬅️ isso é importante para retornar o objeto inserido
          .single(); // retorna apenas o novo evento
      }

    async getEventoByUrl(url: string) {
        const { data, error } = await this.supabase
          .from('tabela_eventos')         // nome da sua tabela
          .select('*')             // pega todas as colunas
          .eq('url', url) // filtra pelo campo evento_ID
          .single();               // espera um único resultado
    
        return { data, error };
      }
    
    async salvarUsuario(usuario: Usuario) {
    return await this.supabase
      .from('tabela_usuario')
      .insert([usuario])
      .select()
      .single();
  }

   async getNextCarteira(): Promise<number> {
    const { data, error } = await this.supabase
      .from('tabela_usuarios')
      .select('carteira')
      .order('carteira', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = “No rows found”, trate só se for outro erro
      throw error;
    }

    const lastCarteira = data?.carteira ?? 0;
    return lastCarteira + 1;
  }

 async signIn(email: string, password: string) {
  return await this.supabase.auth.signInWithPassword({
    email,
    password,
  });
}

  async signUp(email: string, password: string) {
  return await this.supabase.auth.signUp({
    email,
    password,
  });
}

  async signOut() {
    await this.supabase.auth.signOut();
  }

  async isUserAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await this.supabase.auth.getSession();

  return !!session; // true se estiver logado, false se não
}

  getUser() {
    return this.supabase.auth.getUser();
  }
  

}
  

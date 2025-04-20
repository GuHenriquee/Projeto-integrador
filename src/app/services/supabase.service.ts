import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Eventos } from '../paginas/formulario-evento/evento';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

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

    async getEventoById(eventoId: string) {
        const { data, error } = await this.supabase
          .from('tabela_eventos')         // nome da sua tabela
          .select('*')             // pega todas as colunas
          .eq('evento_ID', eventoId) // filtra pelo campo evento_ID
          .single();               // espera um único resultado
    
        return { data, error };
      }
    
}
  

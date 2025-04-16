import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Eventos } from '../formulario/evento';
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
  
    async salvarEvento(evento: Eventos): Promise<void> {
      const { error } = await this.supabase.from('tabela_eventos').insert([evento]);
      if (error) {
        throw error;
      }
    }
  }

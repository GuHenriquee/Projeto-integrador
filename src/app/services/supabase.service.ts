import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Evento } from '../formulario/evento';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root',
  })
  export class SupabaseService {
    private supabase: SupabaseClient;
  
    constructor() {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }
  
    // Métodos serão adicionados aqui
  }
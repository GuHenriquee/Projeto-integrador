import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './paginas/formulario-evento/formulario.component';
import { CabecalhoComponent } from "./components/cabecalho/cabecalho.component";
import { PaginaEventoComponent } from './paginas/pagina-evento/pagina-evento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormularioComponent,
    CabecalhoComponent,
    CabecalhoComponent,
    PaginaEventoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'projeto-integrador';
}

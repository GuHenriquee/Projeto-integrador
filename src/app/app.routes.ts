import { Routes } from '@angular/router';
import { FormularioComponent } from './paginas/formulario-evento/formulario.component';
import { PaginaEventoComponent } from './paginas/pagina-evento/pagina-evento.component';
import { HomeComponent } from './paginas/home/home.component';

export const routes: Routes = [
    {
        path: 'criacao-eventos',
        component: FormularioComponent
    },
    { 
        path: 'evento/:id', 
        component: PaginaEventoComponent
    },
    {
        path: "",
        redirectTo:'criacao-eventos',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
];

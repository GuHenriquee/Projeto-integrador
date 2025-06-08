import { Routes } from '@angular/router';
import { FormularioComponent } from './paginas/formulario-evento/formulario.component';
import { PaginaEventoComponent } from './paginas/pagina-evento/pagina-evento.component';
import { HomeComponent } from './paginas/home/home.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { LoginCadastroComponent } from './paginas/login/login.component';

export const routes: Routes = [
    {
        path: 'criacao-eventos',
        component: FormularioComponent
    },
    { 
        path: 'evento/:UrlDoEvento', 
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
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'login',
        component: LoginCadastroComponent
    }
];

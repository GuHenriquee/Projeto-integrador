import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../components/cabecalho/cabecalho.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CabecalhoComponent, CabecalhoComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

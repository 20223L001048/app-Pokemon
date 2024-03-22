import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.httpService.getPokemonDetails(+id).subscribe(data => {
        this.pokemon = data;
      });
    }
    
  }
  traducirNombre(nombre: string): string {
    switch (nombre) {
      case 'hp': return 'vida';
      case 'attack': return 'ataque';
      case 'defense': return 'defensa';
      case 'special-attack': return 'ataque especial';
      case 'special-defense': return 'defensa especial';
      case 'speed': return 'velocidad';
      default: return nombre;
    }
  }
  
}  
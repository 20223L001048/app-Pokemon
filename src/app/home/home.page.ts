import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public pokemons: any[] = [];
  likes: boolean[] = JSON.parse(localStorage.getItem('likes') || '[]') || [];
  loadedPokemonCount: number = 10; // Inicialmente cargar 10 pokemones

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.httpService.getPokemon(this.loadedPokemonCount).subscribe((data: any) => {
      this.pokemons = this.pokemons.concat(data.results);
      this.pokemons.forEach((pokemon: any, index) => {
        this.httpService.getPokemonDetails(index + 1).subscribe((details: any) => {
          pokemon.sprites = details.sprites;
          pokemon.name = details.name;
        });
      });
    });
  }

  showPokemon(id: number) {
    this.httpService.getPokemonDetails(id).subscribe(data => {
      console.log('Detalles del Pokémon: ', data);
      this.router.navigate(['/details', id]);
    });
  }

  likePokemon(index: number, event: Event) {
    // Detiene la propagación del evento de clic para que no se active el evento de clic de la tarjeta
    event.stopPropagation();

    // Cambia el valor de 'likes' en el índice correspondiente al Pokémon
    this.likes[index] = !this.likes[index];

    // Guarda los 'likes' actualizados en localStorage
    localStorage.setItem('likes', JSON.stringify(this.likes));

    // Si el usuario le dio "me gusta" al Pokémon, lo agrega a los favoritos
    if (this.likes[index]) {
      this.httpService.addFavorite(this.pokemons[index]);
    } else {
      // Si el usuario le quitó el "me gusta" al Pokémon, lo remueve de los favoritos
      this.httpService.removeFavorite(this.pokemons[index]);
    }
  }

  onScroll() {
    // Incrementar el número de Pokémon cargados cuando el usuario se desplaza hacia abajo
    this.loadedPokemonCount += 10;
    this.getPokemons();
  }

}

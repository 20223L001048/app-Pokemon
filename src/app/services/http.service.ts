import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public favorites: any[] = [];

  constructor(private http: HttpClient) { }

  getPokemon(){
    return this.http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025');
  }

  getPokemonDetails(id: number){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getFavorites() {
    // Obtiene los favoritos de localStorage
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(pokemon: any) {
    // Obtiene los favoritos actuales de localStorage
    let favorites = this.getFavorites();

    // Agrega el nuevo favorito
    favorites.push(pokemon);

    // Guarda los favoritos actualizados en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  removeFavorite(pokemon: any) {
    // Obtiene los favoritos actuales de localStorage
    let favorites = this.getFavorites();
  
    // Encuentra el índice del Pokémon en los favoritos
    const index = favorites.findIndex((favorite: any) => favorite.name === pokemon.name);
  
    // Si el Pokémon está en los favoritos, lo elimina
    if (index > -1) {
      favorites.splice(index, 1);
    }
  
    // Guarda los favoritos actualizados en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

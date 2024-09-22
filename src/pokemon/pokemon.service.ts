import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class PokemonService {
  private readonly pokeApiUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  // 1. GET /api/pokemon - List the first 100 Pokemons
  getFirstHundredPokemons() {
    return this.httpService
      .get(`${this.pokeApiUrl}/pokemon?limit=100`)
      .pipe(map((response) => response.data.results));
  }

  // 2. GET /api/pokemon/:id - Get specific Pokemon by ID
  getPokemonById(id: number) {
    return this.httpService.get(`${this.pokeApiUrl}/pokemon/${id}`).pipe(
      map((response) => ({
        name: response.data.name,
        types: response.data.types.map((t) => ({
          slot: t.slot,
          type: {
            name: t.type.name,
            url: t.type.url,
          },
        })),
      })),
    );
  }

  // 3. GET /api/pokemonAndTypes/:id - Get Pokemon with type translations
  getPokemonWithTranslatedTypes(id: number) {
    return this.httpService.get(`${this.pokeApiUrl}/pokemon/${id}`).pipe(
      map(async (response) => {
        const pokemon = {
          name: response.data.name,
          types: await Promise.all(
            response.data.types.map(async (t) => {
              const typeData = await this.httpService
                .get(t.type.url)
                .toPromise();
              const names = typeData.data.names
                .filter((n) => n.language.name === 'es' || n.language.name === 'ja')
                .map((n) => ({
                  language: n.language.name,
                  name: n.name,
                }));
              return {
                slot: t.slot,
                type: {
                  name: t.type.name,
                  url: t.type.url,
                  names,
                },
              };
            }),
          ),
        };
        return pokemon;
      }),
    );
  }
}

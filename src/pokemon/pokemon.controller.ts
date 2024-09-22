import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('api')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // 1. GET /api/pokemon - List all first 100 Pokemons
  @Get('pokemon')
  getFirstHundredPokemons() {
    return this.pokemonService.getFirstHundredPokemons();
  }

  // 2. GET /api/pokemon/:id - Get specific Pokemon by ID
  @Get('pokemon/:id')
  getPokemonById(@Param('id') id: string) {
    return this.pokemonService.getPokemonById(+id);
  }

  // 3. GET /api/pokemonAndTypes/:id - Get Pokemon with type translations
  @Get('pokemonAndTypes/:id')
  getPokemonWithTranslatedTypes(@Param('id') id: string) {
    return this.pokemonService.getPokemonWithTranslatedTypes(+id);
  }
}

# PokeAPI 

## Descripción
Este proyecto es una API RESTful en NestJS que se conecta a la PokeAPI para obtener información de Pokémon.

## Endpoints
- `GET /api/pokemon`: Lista los primeros 100 Pokémon con su nombre y URL.
- `GET /api/pokemon/:id`: Obtiene el nombre y tipos de un Pokémon por ID.
- `GET /api/pokemonAndTypes/:id`: Obtiene el nombre, tipos y traducciones de los tipos (en español y japonés) de un Pokémon por ID.

## Instalación
1. Clonar el repositorio
2. Ejecutar `npm install` para instalar las dependencias
3. Ejecutar `npm run start` para iniciar el servidor

## Tecnologías utilizadas
- NestJS
- Axios para las solicitudes HTTP

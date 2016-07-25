import pokemonTypes from '../constants/pokemonTypes.es6';
import _ from 'lodash';
import * as Pokemon from '../api/controllers/pokemon.es6';


_(pokemonTypes).forEach(async (types, pokemon) => {
  const created = await Pokemon.create(pokemon, types);
  console.log(created);
});

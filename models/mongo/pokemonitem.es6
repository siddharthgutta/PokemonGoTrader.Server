import mongoose from 'mongoose';
// import * as Pokemon from '../../api/controllers/pokemon.es6';
import Item from './item.es6';
//
// async function checkPokemon(name) {
//   try {
//     await Pokemon.findByName(name);
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

// PokemonItem is a discriminator of Item which essentially is like an extension
// allowing it to retain all the properties of an item while adding more properties
// and specific validators for Pokemon
const pokemonItemSchema = Item.discriminator('PokemonItem', new mongoose.Schema({
  name: {
    type: String
  //   validate: {
  //     validator: name => checkPokemon(name),
  //     message: 'Invalid Pokemon name'
  //   }
  },
  types: {
    type: [String],
    required: true
  },
  combatPower: {
    type: Number,
    required: true,
    validate: {
      validator: combatPower => Number.isInteger(combatPower) && combatPower >= 0,
      message: 'Combat Power must be an integer'
    }
  }
}));

export default mongoose.model('PokemonItem', pokemonItemSchema);

import mongoose from 'mongoose';
import pokemonNames from '../../constants/pokemonNames.es6';
import * as Item from './item.es6';

const options = {
  discriminatorKey: 'kind'
};

// PokemonItem is a discriminator of Item which essentially is like an extension
// allowing it to retain all the properties of an item while adding more properties
// and specific validators for Pokemon
const pokemonItemSchema = Item.discriminator('PokemonItem', new mongoose.Schema({
  name: {
    enum: pokemonNames
  },
  types: [String],
  combatPower: {
    type: Number,
    required: true,
    validate: {
      validator: combatPower => Number.isInteger(combatPower) && combatPower >= 0,
      message: 'Combat Power must be an integer'
    }
  }
}, options));

export default mongoose.model('PokemonItem', pokemonItemSchema);

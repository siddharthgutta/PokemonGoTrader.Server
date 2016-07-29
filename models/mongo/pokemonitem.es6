import mongoose from 'mongoose';
import Item from './item.es6';

const pokemonItemSchema = Item.discriminator('PokemonItem', new mongoose.Schema({
  name: {
    type: String
  },
  types: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PokemonType'
  }],
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

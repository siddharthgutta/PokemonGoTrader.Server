import mongoose from 'mongoose';
import * as Item from './item.es6';

// PokemonItem is a discriminator of Item which essentially is like an extension
// allowing it to retain all the properties of an item while adding more properties
// and specific validators for Pokemon
const pokemonItemSchema = Item.discriminator('PokemonItem', new mongoose.Schema({
	types: [String],
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

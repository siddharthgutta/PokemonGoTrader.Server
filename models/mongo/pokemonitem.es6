import mongoose from 'mongoose';
import fs from 'fs';
import * as Item from './item.es6';
import * as Utils from '../../libs/utils.es6';

const options = {
	discriminatorKey: 'kind'
};

function checkPokemon(name) {
	const pokemonFile = fs.readFileSync('../../data/pokemon.json');
	const pokemonNames = JSON.parse(pokemonFile);
	return !Utils.isEmpty(pokemonNames[name]);
}

const pokemonItemSchema = Item.discriminator('PokemonItem', new mongoose.Schema({
	name: {
		validate: {
			validator: name => checkPokemon(name),
			message: 'That is not a valid Pokemon name'
		}
	},
	types: [String],
	combatPower: {
		type: Number,
		required: true,
		min: 10,
		validate: {
			validator: combatPower => Number.isInteger(combatPower),
			message: 'Combat Power must be an integer'
		}
	}
}, options));

export default mongoose.model('PokemonItem', pokemonItemSchema);

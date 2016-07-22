import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
	name: {
		type: String
	},
	types: [String]
});

export default mongoose.model('Pokemon', pokemonSchema);

import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String
  },
  types: {
    type: [String]
  }
});

export default mongoose.model('Pokemon', pokemonSchema);

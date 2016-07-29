import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  types: [{
    type: mongoose.Schema.Types.ObjectId
  }]
});

export default mongoose.model('Pokemon', pokemonSchema);

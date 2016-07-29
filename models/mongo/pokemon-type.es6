import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

export default mongoose.model('PokemonType', typeSchema);

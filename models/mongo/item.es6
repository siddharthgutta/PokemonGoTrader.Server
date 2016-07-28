import mongoose from 'mongoose';

const options = {
  discriminatorKey: 'kind'
};

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['buy', 'sell', 'trade'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sold', 'onHold'],
    default: 'pending'
  },
  price: {
    type: Number,
    validate: {
      validator: price => Number.isInteger(price) && price >= 0,
      message: 'Price must be an integer'
    }
  },
  description: {
    type: String
  },
  photos: [String],
  defaultPhoto: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
}, options);

export default mongoose.model('Item', itemSchema);

import mongoose from 'mongoose';
import item from './item.es6';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  profileImage: {
    type: String
  },
  fbId: {
    type: String,
    unique: true,
    required: true
  },
  venmoId: {
    type: String,
    unique: true
  },
  items: [item.schema],
  context: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Context'
  }
});

export default mongoose.model('User', userSchema);

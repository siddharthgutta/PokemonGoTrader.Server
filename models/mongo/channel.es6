import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  buyerFbId: {
    type: String,
    required: true
  },
  sellerFbId: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Channel', channelSchema);

import mongoose from 'mongoose';

const contextSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Context', contextSchema);

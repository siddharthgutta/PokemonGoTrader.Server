import mongoose from 'mongoose';

const contextSchema = new mongoose.Schema({
  channelId: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Context', contextSchema);

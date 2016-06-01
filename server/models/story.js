import mongoose, {Schema} from 'mongoose';

const StorySchema = new Schema({
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Story', StorySchema);

import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: String,
  created: {
    type: Date,
    default: Date.now
  },
  blurb: String,
  story_ids: [{
    type: Schema.Types.ObjectId,
    ref: 'Story'
  }]
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);

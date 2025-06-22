const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  displayName: { type: String },
  picture: { type: String },

  socialAccounts: [
    {
      platform: { type: String, required: true }, 
      username: { type: String },
      accessToken: { type: String },
      refreshToken: { type: String },
      connectedAt: { type: Date, default: Date.now }
    }
  ],


});

module.exports = mongoose.model('User', UserSchema);

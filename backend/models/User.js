// /models/User.js
import mongoose  from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('t_login', userSchema);
export default  User;

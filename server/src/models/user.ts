import mongoose from 'mongoose';
import { IUser } from '../types/todo';
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  username: {
    type: String
  },
  email: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  isAdmin: {
    type: Boolean, 
    default: false
  }
}, {
  timestamps: true
})

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  try {
      const salt = await bcrypt.genSalt(10)
      return bcrypt.hash(password, salt)
  } catch(error) {
      throw error
  }
}

userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}
 
const User = mongoose.model<IUser>('User', userSchema);

export default User;
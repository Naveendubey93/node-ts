import  mongoose, { Document, model, Schema, Model } from 'mongoose';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User model
const userSchema = new Schema<User>({
  id: { type: String, required: true,  unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  // createdAt: { type: Date, required: true },
  // updatedAt: { type: Date, required: true },
},{
  timestamps: true
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
        // const UserModel = mongoose.model<User>('User', UserSchema);

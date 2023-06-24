import mongoose, { Document, Schema } from 'mongoose';

// Define the data structure
interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User model
const UserSchema = new Schema<User>({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const UserModel = mongoose.model<User>('User', UserSchema);

// Seeder class
class Seeder {
  async seedData(): Promise<void> {
    try {
      // Connect to MongoDB
      await mongoose.connect('mongodb://localhost:27017/your-database', {
        connectTimeoutMS: 5000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions );
      console.log('Connected to MongoDB');

      // Sample data
      const data: Partial<User>[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: 'password2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more sample data as needed
      ];

      // Seed the data in MongoDB
      await UserModel.insertMany(data);
      console.log('Data seeded successfully');

      // Disconnect from MongoDB
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error seeding data:', error);
      await mongoose.disconnect();
    }
  }
}

// Create an instance of the Seeder class and run the seedData method
const seeder = new Seeder();
seeder.seedData()
  .catch((error) => {
    console.error('Error:', error);
});

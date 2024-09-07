import mongoose from 'mongoose';

const connectDB = async (dbURL: string) => {
  try {
    await mongoose.connect(dbURL);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  }
};

export default connectDB;

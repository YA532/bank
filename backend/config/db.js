import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // The `useNewUrlParser` and `useUnifiedTopology` options are deprecated
    // and no longer have any effect with MongoDB Node Driver v4+. The driver
    // and Mongoose handle these behaviors by default now. Remove them to
    // avoid deprecation warnings.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

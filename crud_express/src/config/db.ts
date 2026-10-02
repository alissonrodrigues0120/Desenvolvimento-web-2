import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao conectar no MongoDB: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;

import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: 'variables.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
    });
    console.log('DB conectada');
  } catch (error) {
    console.log('Hubo un error');
    console.log(error);
    process.exit(1); // detener la pp
  }
};

export { conectarDB };

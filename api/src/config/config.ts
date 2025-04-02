
import dotenv from 'dotenv';
import { Config } from '../types/Config';

dotenv.config();

const config: Config = {
  PORT: parseInt(process.env.PORT ?? "8080"),
  PERS: process.env.PERS ?? "mongodb",
  API_URL: process.env.API_URL ?? "",
  mongodb: {
    mongoUrl: process.env.MONGO_URL ?? "",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  admin: {
    adminId: process.env.ADMIN_ID ?? "",
    adminSecretKey: process.env.ADMIN_SECRET_KEY ?? "secret_key",
  },
};

export default config;

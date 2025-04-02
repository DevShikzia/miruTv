export interface Config {
  PORT: number;
  PERS: string;
  API_URL: string;
  mongodb: {
    mongoUrl: string;
    options: {
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
      serverSelectionTimeoutMS: number;
    };
  };
  admin: {
    adminId: string;
    adminSecretKey: string;
  };
}

export interface IGenre extends Document {
    name: string;
    description?: string;
    popularity: number;
    createdAt: Date;
    updatedAt: Date;
  }
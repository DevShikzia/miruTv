// models/Genre.ts
import { Schema, model } from 'mongoose';
import { IGenre } from '../types/Genre';

const genreSchema = new Schema<IGenre>({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  description: { type: String },
  popularity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware para asegurar formato consistente
genreSchema.pre<IGenre>('save', function(next) {
  this.name = this.name.toLowerCase().trim();
  next();
});

export const Genre = model<IGenre>('Genre', genreSchema);
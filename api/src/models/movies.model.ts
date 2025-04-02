// models/Movie.ts
import { Schema, model } from 'mongoose';
import { IMovie, Language } from '../types/Movie';
import { Genre } from './genre.model';

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  language: { type: String, enum: Object.values(Language), required: true },
  subtitled: { type: Boolean, required: true },
  videoLink: { type: String, required: true },
  trailerLink: { type: String },
  coverLink: { type: String, required: true },
  actors: [{
    name: { type: String},
    character: { type: String },
    photoUrl: { type: String }
  }],
  director: { type: String, required: true },
  year: { 
    type: Number, 
    required: true,
    min: 1888, // año de la primera película
    max: new Date().getFullYear() + 10 // permitir películas futuras
  },
  genres: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Genre',
    required: true,
    validate: {
      validator: async (ids: Schema.Types.ObjectId[]) => {
        const count = await Genre.countDocuments({ _id: { $in: ids } });
        return count === ids.length;
      },
      message: 'Uno o más géneros no existen'
    }
  }],
  reviews: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  tags: {
    type: [String],
    index: true,
    default: [],
    set: (tags: string[]) => tags.map(tag => tag.toLowerCase().trim())
  },
  deleted: { type: Boolean, default: false },
},
{ timestamps: true }
);

// Middleware para actualizar el rating promedio
movieSchema.pre<IMovie>('save', function(next) {
  if (this.reviews && this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = parseFloat((total / this.reviews.length).toFixed(1));
  }
  next();
});

movieSchema.index({ title: 'text', director: 'text', 'actors.name': 'text', tags: 'text' });
movieSchema.index({ year: 1, averageRating: -1 });

export const Movie = model<IMovie>('Movie', movieSchema);
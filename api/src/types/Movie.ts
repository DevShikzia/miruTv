import { Document, Schema, model } from 'mongoose';

export enum Language {
    ENGLISH = 'english',
    SPANISH = 'spanish'
  }
  
  interface IActor {
    name: string;
    character?: string;
    photoUrl?: string;
  }
  
  interface IReview {
    userId: Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  
  export interface IMovie extends Document {
    title: string;
    description: string;
    duration: number; // en minutos
    language: Language;
    subtitled: boolean;
    videoLink: string;
    trailerLink?: string;
    coverLink: string;
    actors: IActor[];
    director: string;
    year: number;
    genres: Schema.Types.ObjectId[]; 
    reviews: IReview[];
    averageRating?: number;
    tags: string[];
    deleted?: boolean;
    createdAt: Date;
    modifiedAt: Date;
  }
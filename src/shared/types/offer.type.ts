import { Amenity } from './amenity.type.js';
import { ApartmentType } from './apartment-type.enum.js';
import { Coordinates } from './coordinates.type.js';
import { TownType } from './town-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  town: TownType;
  image: string;
  gallery: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  apartmentType: ApartmentType;
  roomCount: number;
  guestCount: number;
  cost: number;
  amenities: Amenity[];
  author: User;
  commentCount: number;
  coordinates: Coordinates;
};

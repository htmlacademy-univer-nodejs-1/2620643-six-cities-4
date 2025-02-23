import { Amenity } from './amenity.type.js';
import { ApartmentType } from './apartment-type.enum.js';
import { Coordinates } from './coordinates.type.js';
import { TownType } from './town-type.enum.js';
import { User } from './user.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  dates: Date[];
  towns: TownType[];
  images: string[];
  galleries: Array<string[]>;
  isPremium: boolean[];
  isFavorite: boolean[];
  ratings: number[];
  apartmentTypes: ApartmentType[];
  roomCounts: number[];
  guestCounts: number[];
  costs: number[];
  amenities: Array<Amenity[]>;
  authors: User[];
  commentCounts: number[];
  coordinates: Coordinates[];
};

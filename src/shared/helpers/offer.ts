import { ApartmentType } from '../types/apartment-type.enum.js';
import { TownType } from '../types/town-type.enum.js';
import { Amenity } from '../types/amenity.type.js';
import { UserType } from '../types/user-type.enum.js';
import { User } from '../types/user.type.js';
import { Coordinates } from '../types/coordinates.type.js';
import { getEnumKeyByValue } from './index.js';

export function createOffer(offerData: string) {
  const [
    title,
    description,
    date,
    town,
    image,
    gallery,
    isPremium,
    isFavorite,
    rating,
    apartmentType,
    roomCount,
    guestCount,
    cost,
    amenities,
    author,
    commentCount,
    coordinates,
  ] = offerData.replace('\n', '').split('\t');

  const parsedAuthor = JSON.parse(author);

  const apartmentTypeKey = getEnumKeyByValue(ApartmentType, apartmentType);
  const userTypeKey = getEnumKeyByValue(UserType, parsedAuthor.type);

  return {
    title,
    description,
    date: new Date(date),
    town: TownType[town as keyof typeof TownType],
    image,
    gallery: JSON.parse(gallery),
    isPremium: JSON.parse(isPremium),
    isFavorite: JSON.parse(isFavorite),
    rating: Number(rating),
    apartmentType: ApartmentType[apartmentTypeKey!],

    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    cost: Number(cost),
    amenities: (JSON.parse(amenities) as string[]).map((a) => a as Amenity),
    author: {
      ...parsedAuthor,
      type: UserType[userTypeKey!],
    } as User,
    commentCount: Number(commentCount),
    coordinates: JSON.parse(coordinates) as Coordinates,
  };
}

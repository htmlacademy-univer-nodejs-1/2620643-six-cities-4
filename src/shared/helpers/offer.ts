import { ApartmentType } from '../types/apartment-type.enum.js';
import { TownType } from '../types/town-type.enum.js';
import { Amenity } from '../types/amenity.type.js';
import { UserType } from '../types/user-type.enum.js';
import { User } from '../types/user.type.js';
import { Coordinates } from '../types/coordinates.type.js';

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
    apartmentType: ApartmentType[apartmentType as keyof typeof ApartmentType],
    roomCount: Number(roomCount),
    guestCount: Number(guestCount),
    cost: Number(cost),
    amenities: (JSON.parse(amenities) as string[]).map((a) => a as Amenity),
    author: {
      ...JSON.parse(author),
      type: UserType[
        JSON.parse(author).type as string as keyof typeof UserType
      ],
    } as User,
    commentCount: Number(commentCount),
    coordinates: JSON.parse(coordinates) as Coordinates,
  };
}

import { Amenity } from '../../../types/amenity.type.js';
import { ApartmentType, TownType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public image?: string;
  public date?: Date;
  public cost?: number;
  public town?: TownType;
  public gallery?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public apartmentType?: ApartmentType;
  public roomCount?: number;
  public guestCount?: number;
  public amenities?: Amenity[];
}

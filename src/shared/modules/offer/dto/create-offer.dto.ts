import { Amenity } from '../../../types/amenity.type.js';
import { ApartmentType } from '../../../types/apartment-type.enum.js';
import { TownType } from '../../../types/town-type.enum.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public image!: string;
  public date!: Date;
  public cost!: number;
  public town!: TownType;
  public gallery!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public apartmentType!: ApartmentType;
  public roomCount!: number;
  public guestCount!: number;
  public amenities!: Amenity[];
  public userId!: string;
}

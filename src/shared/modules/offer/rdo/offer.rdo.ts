import { Expose } from 'class-transformer';
import { Amenity } from '../../../types/amenity.type.js';
import { ApartmentType, TownType } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public image!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public cost!: number;

  @Expose()
  public town!: TownType;

  @Expose()
  public gallery!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public apartmentType!: ApartmentType;

  @Expose()
  public roomCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  public amenities!: Amenity[];

  @Expose()
  public commentCount!: number;

  @Expose()
  public coordinates!: number;

  @Expose()
  public userId!: string;
}

import { Expose } from 'class-transformer';
import { ApartmentType, TownType } from '../../../types/index.js';

export class OfferSummaryRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public cost!: number;

  @Expose()
  public apartmentType!: ApartmentType;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public date!: Date;

  @Expose()
  public town!: TownType;

  @Expose()
  public image!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  public userId!: string;
}

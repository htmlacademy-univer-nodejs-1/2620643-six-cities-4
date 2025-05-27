import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { TownType } from '../../types/town-type.enum.js';
import { ApartmentType } from '../../types/index.js';
import { Amenity } from '../../types/amenity.type.js';
import { UserEntity } from '../user/user.entity.js';
import { Coordinates } from '../../types/coordinates.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public image!: string;

  @prop()
  public date!: Date;

  @prop()
  public cost!: number;

  @prop({
    type: () => String,
    enum: TownType,
  })
  public town!: TownType;

  @prop()
  public gallery!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: ApartmentType,
  })
  public apartmentType!: ApartmentType;

  @prop()
  public roomCount!: number;

  @prop()
  public guestCount!: number;

  @prop()
  public amenities!: Amenity[];

  @prop()
  public commentCount!: number;

  @prop()
  public coordinates!: Coordinates;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);

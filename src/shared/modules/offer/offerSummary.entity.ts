import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { ApartmentType, TownType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferSummaryEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferSummaryEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop()
  public cost!: number;

  @prop({
    type: () => String,
    enum: ApartmentType,
  })
  public apartmentType!: ApartmentType;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public date!: Date;

  @prop({
    type: () => String,
    enum: TownType,
  })
  public town!: TownType;

  @prop()
  public image!: string;

  @prop()
  public isPremium!: boolean;

  @prop()
  public rating!: number;

  @prop()
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const OfferSummaryModel = getModelForClass(OfferSummaryEntity);

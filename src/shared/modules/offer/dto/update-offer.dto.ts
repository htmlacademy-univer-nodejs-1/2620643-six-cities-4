import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { Amenity } from '../../../types/amenity.type.js';
import {
  AMENITY_VALUES,
  ApartmentType,
  TownType,
} from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { MaxDecimalPlaces } from '../../../helpers/index.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, {
    message: UpdateOfferValidationMessage.description.minLength,
  })
  @MaxLength(1024, {
    message: UpdateOfferValidationMessage.description.maxLength,
  })
  public description?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: UpdateOfferValidationMessage.date.invalidFormat }
  )
  public date!: Date;

  @IsOptional()
  @IsEnum(TownType, { message: UpdateOfferValidationMessage.town.invalidTown })
  public town!: TownType;

  @IsOptional()
  @MaxLength(256, { message: UpdateOfferValidationMessage.image.maxLength })
  public image!: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(6, { message: UpdateOfferValidationMessage.gallery.minLength })
  @ArrayMaxSize(6, { message: UpdateOfferValidationMessage.gallery.maxLength })
  @IsString({ each: true })
  public gallery!: string[];

  @IsOptional()
  public isPremium!: boolean;

  @IsOptional()
  public isFavorite!: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: UpdateOfferValidationMessage.rating.min })
  @Max(5, { message: UpdateOfferValidationMessage.rating.max })
  @Validate(MaxDecimalPlaces)
  public rating!: number;

  @IsOptional()
  @IsEnum(ApartmentType, {
    message: UpdateOfferValidationMessage.apartmentType.invalidApartment,
  })
  public apartmentType!: ApartmentType;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: UpdateOfferValidationMessage.roomCount.min })
  @Max(8, { message: UpdateOfferValidationMessage.roomCount.max })
  public roomCount!: number;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: UpdateOfferValidationMessage.guestCount.min })
  @Max(10, { message: UpdateOfferValidationMessage.guestCount.max })
  public guestCount!: number;

  @IsOptional()
  @IsNumber()
  @Min(100, { message: UpdateOfferValidationMessage.cost.min })
  @Max(100000, { message: UpdateOfferValidationMessage.cost.max })
  public cost!: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: UpdateOfferValidationMessage.amenities.empty })
  @IsIn(AMENITY_VALUES, {
    each: true,
    message: UpdateOfferValidationMessage.amenities.includeAmenities,
  })
  public amenities!: Amenity[];
}

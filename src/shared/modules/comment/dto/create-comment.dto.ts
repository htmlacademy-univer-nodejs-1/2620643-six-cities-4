import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: 'min is 5, max is 1024 ' })
  public text!: string;

  @IsDateString({}, { message: CreateCommentMessages.date.invalidFormat })
  public date!: string;

  @IsNumber()
  @Min(1, { message: CreateCommentMessages.rating.min })
  @Max(5, { message: CreateCommentMessages.rating.max })
  public rating!: string;

  @IsMongoId({ message: CreateCommentMessages.author.invalidFormat })
  public author!: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;
}

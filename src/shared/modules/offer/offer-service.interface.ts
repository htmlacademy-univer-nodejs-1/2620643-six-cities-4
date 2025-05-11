import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { OfferSummaryEntity } from './offerSummary.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { TownType } from '../../types/town-type.enum.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(
    userId: string,
    offerId: string
  ): Promise<(DocumentType<OfferEntity> & { isFavorite: boolean }) | null>;
  find(count?: number): Promise<DocumentType<OfferSummaryEntity>[]>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremOffersByTown(
    userId: string,
    town: TownType
  ): Promise<DocumentType<OfferSummaryEntity>[]>;
  getUserFavorites(userId: string): Promise<DocumentType<OfferSummaryEntity>[]>;
  addFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<OfferSummaryEntity>>;
  deleteFavorite(userId: string, offerId: string): Promise<void>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}

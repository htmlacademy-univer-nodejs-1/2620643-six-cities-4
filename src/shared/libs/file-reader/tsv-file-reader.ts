import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read() {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray() {
    if (!this.rawData) {
      throw new Error('File is not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
          title,
          description,
          date: new Date(date),
          town,
          image,
          gallery: JSON.parse(gallery),
          isPremium: JSON.parse(isPremium),
          isFavorite: JSON.parse(isFavorite),
          rating: Number(rating),
          apartmentType,
          roomCount: Number(roomCount),
          guestCount: Number(guestCount),
          cost: Number(cost),
          amenities: JSON.parse(amenities),
          author: JSON.parse(author),
          commentCount: Number(commentCount),
          coordinates: JSON.parse(coordinates),
        })
      );
  }
}

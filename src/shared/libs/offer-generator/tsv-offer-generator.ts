import dayjs from 'dayjs';
import { getRandomItem } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from '../../types/offer-generator.interface.js';

export class TSVOfferGenerator implements OfferGenerator{
  constructor(private readonly mockData: MockServerData){}

  public generate() {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const date = getRandomItem(this.mockData.dates);
    const town = getRandomItem(this.mockData.towns);
    const coordinates = this.mockData.coordinates[this.mockData.towns.indexOf(town)];
    const image = getRandomItem(this.mockData.images);
    const gallery = getRandomItem(this.mockData.galleries);
    const isPremium = getRandomItem(this.mockData.isPremium);
    const isFavorite = getRandomItem(this.mockData.isFavorite);
    const rating = getRandomItem(this.mockData.ratings);
    const apartmentType = getRandomItem(this.mockData.apartmentTypes);
    const roomCount = getRandomItem(this.mockData.roomCounts);
    const guestCount = getRandomItem(this.mockData.guestCounts);
    const cost = getRandomItem(this.mockData.costs);
    const amenity = getRandomItem(this.mockData.amenities);
    const author = getRandomItem(this.mockData.authors);
    const commentCount = getRandomItem(this.mockData.commentCounts);

    const createdDate = dayjs(date).format('MM-DD-YYYY');
    const stringCoordinates = JSON.stringify(coordinates);
    const stringAuthor = JSON.stringify(author);
    const stringAmenity = JSON.stringify(amenity);
    const stringGallery = JSON.stringify(gallery);

    const resultOfGenerating = [
      title,
      description,
      createdDate,
      town,
      image,
      stringGallery,
      isPremium,
      isFavorite,
      rating,
      apartmentType,
      roomCount,
      guestCount,
      cost,
      stringAmenity,
      stringAuthor,
      commentCount,
      stringCoordinates
    ].join('\t');

    console.log(resultOfGenerating);

    return resultOfGenerating;
  }
}

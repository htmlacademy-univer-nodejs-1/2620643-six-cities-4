export function createOffer(offerData: string) {
  const [
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
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  return {
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
  };
}



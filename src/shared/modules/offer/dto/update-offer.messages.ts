export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum title length must be 20',
    maxLength: 'Maximum title length must be 1024',
  },
  date: {
    invalidFormat: 'PostDate must be a valid ISO date',
  },
  image: {
    maxLength: 'Too short for field «image»',
  },
  town: { invalidTown: 'Town must be one of the predefined cities' },
  gallery: {
    minLength: 'Gallery must contain exactly 6 images',
    maxLength: 'Gallery must contain exactly 6 images',
  },
  rating: {
    min: 'Min 1',
    max: 'Max 5',
  },
  apartmentType: {
    invalidApartment:
      'Current appartment must be one of the predefined appartment',
  },
  roomCount: {
    min: 'Min 1',
    max: 'Max 8',
  },
  guestCount: {
    min: 'Min 1',
    max: 'Max 10',
  },
  cost: {
    min: 'Min 100',
    max: 'Max 100 000',
  },
  amenities: {
    empty: 'At least one amenity must be selected',
    includeAmenities: 'Each amenity must be one of the predefined values',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;

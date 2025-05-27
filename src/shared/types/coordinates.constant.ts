import { Coordinates } from './coordinates.type.js';
import { TownType } from './town-type.enum.js';

export const COORDINATES_BY_TOWN: Record<TownType, Coordinates> = {
  [TownType.Paris]: {
    latitude: 48.85661,
    longitude: 2.351499,
  },
  [TownType.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [TownType.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [TownType.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [TownType.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [TownType.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
};

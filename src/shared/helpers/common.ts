import { ClassConstructor, plainToInstance } from 'class-transformer';
import { TownType } from '../types/town-type.enum.js';
import { COORDINATES_BY_TOWN } from '../types/coordinates.constant.js';

export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function getCoordinatesByTown(town: TownType) {
  return COORDINATES_BY_TOWN[town];
}

export function getEnumKeyByValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined {
  return (Object.keys(enumObj) as Array<keyof T>).find(
    (key) => enumObj[key] === value
  );
}

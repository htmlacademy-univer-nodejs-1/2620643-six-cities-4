export const CreateUserMessages = {
  mail: {
    invalidFormat: 'email must be a valid address',
  },
  avatar: {
    invalidFormat: 'avatarPath is required',
  },
  name: {
    invalidFormat: 'firstname is required',
    lengthField: 'min length is 1, max is 15',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12',
  },
  type: {
    invalidType:
      'Current type must be one of the predefined type: pro or обычный',
    missingType: 'User type is required',
  },
} as const;

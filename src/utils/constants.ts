export const APP_TITLE = 'Navigator';
export const REQUIRED_FIELD_MESSAGE = 'This field is required.';
export const MIN_PASSWORD_LENGTH = 8;
export const PASSWORD_LENGTH_MESSAGE = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;

export const REQUIRED_FORM_FIELDS_RULES = {
  required: REQUIRED_FIELD_MESSAGE,
};

export const PASSWORD_RULES = {
  ...REQUIRED_FORM_FIELDS_RULES,
  minLength: { value: MIN_PASSWORD_LENGTH, message: PASSWORD_LENGTH_MESSAGE },
};

export const SUGGESTIONS = [
  'How much time can I take off?',
  'We are expecting a new baby in the next 4 months. What is my parental leave?',
  'Whats the process for Foreign Travel? What do I need to do and by when?',
];

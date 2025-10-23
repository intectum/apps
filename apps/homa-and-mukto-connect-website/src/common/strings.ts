const strings: Record<string, Record<string, string>> =
{
  contacts:
  {
    email: 'Email',
    instagram: 'Instagram',
    phone: 'Phone',
    whatsapp: 'WhatsApp'
  },
  forms: {
    instagramTitle: 'Must not start with @',
    passwordTitle: 'Must be a minimum of eight characters with at least one letter and one number',
    phoneTitle: 'Must be an international number starting with a country code and only including numbers and spaces e.g. +1 1232 456 789'
  },
  groupTypes:
  {
    'consciousness': 'Tantra Consciousness',
    'training-1': 'Tantra Training 1',
    'training-2': 'Tantra Training 2',
    'training-3': 'Tantra Training 3'
  },
  groupLocations:
  {
    'bali': 'Bali',
    'osheanic': 'Osheanic',
    'osho-afroz': 'OSHO Afroz'
  },
  months:
  {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
};

export default strings;

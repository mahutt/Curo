import { AppState } from './app-state'
export const generateId = () => Math.random().toString(36).substring(2, 9)
export const DEFAULT_APP_STATE: AppState = {
  profile: {
    id: 'profile',
    name: 'John Doe',
    email: 'jdoe@concordia.ca',
    fontSize: 16,
    colorBlind: 'normal',
    notificationPreference: 'email',
    hideNotificationDetails: false,
  },
  tab: 'reminders',
  drawerObject: null,
  stackObject: null,
  medications: [
    {
      id: generateId(),
      name: 'Oxycotin',
      description: 'Pain medication',
      reminders: [
        {
          id: generateId(),
          time: '10:00 AM',
          type: 'medication',
          dosage: '1 pill',
          taken: true,
        },
        {
          id: generateId(),
          time: '4:00 PM',
          type: 'medication',
          dosage: '1 pill',
          taken: false,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Aspirin',
      description: 'Pain reliever and blood thinner',
      reminders: [
        {
          id: generateId(),
          time: '12:00 PM',
          type: 'medication',
          dosage: '2 pills',
          taken: false,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Lipitor',
      description: 'Cholesterol medication',
      reminders: [
        {
          id: generateId(),
          time: '2:00 PM',
          type: 'medication',
          dosage: '1 pill',
          taken: false,
        },
      ],
    },
  ],
  practitioners: [
    {
      id: generateId(),
      name: 'Dr. Smith',
      specialty: 'Cardiologist',
      imageUrl:
        'https://media.licdn.com/dms/image/v2/D4E03AQHlySQ8BKZYWg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718905678151?e=1745452800&v=beta&t=Sze_DRKXdkDvjzA0u2ag5q-tXg1ceIsN41smsvUswCQ',
      reminders: [
        {
          id: generateId(),
          time: '10:00 AM',
          type: 'appointment',
          duration: '30 minutes',
          taken: true,
        },
        {
          id: generateId(),
          time: '2:00 PM',
          type: 'appointment',
          duration: '30 minutes',
          taken: false,
        },
        {
          id: generateId(),
          time: '4:00 PM',
          type: 'appointment',
          duration: '30 minutes',
          taken: false,
        },
      ],
    },
    {
      id: generateId(),
      name: 'Dr. Doe',
      specialty: 'Cardiologist',
      imageUrl:
        'https://media.licdn.com/dms/image/v2/D4E03AQFNE6EQzlKxAw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1720576222081?e=1745452800&v=beta&t=nYRfDSDj4WoQUvvKwgh6YDVAORwrw8T0sDdeu4XtOTg',
      reminders: [],
    },
  ],
  addMenuOpen: false,
}

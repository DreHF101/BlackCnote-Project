# BlackCnote Mobile App

BlackCnote Investment Platform mobile application built with React Native and Expo.

## Features

- **Cross-Platform**: Native iOS and Android applications
- **Biometric Authentication**: Fingerprint and Face ID support
- **Real-time Portfolio Tracking**: Live investment monitoring
- **Investment Calculator**: Advanced ROI calculations
- **Dark Theme**: Professional dark-themed UI
- **Offline Support**: Core functionality works offline
- **Push Notifications**: Investment updates and alerts
- **Secure Storage**: Encrypted local data storage

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation and routing
- **React Native Paper**: Material Design components
- **TanStack Query**: Data fetching and caching
- **Expo Local Authentication**: Biometric authentication
- **React Native Chart Kit**: Data visualization
- **TypeScript**: Type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. Navigate to mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

### Running on Devices

#### iOS Simulator
```bash
npm run ios
```

#### Android Emulator
```bash
npm run android
```

#### Web Browser
```bash
npm run web
```

## Building for Production

### Development Build
```bash
eas build --profile development
```

### Preview Build
```bash
eas build --profile preview
```

### Production Build
```bash
eas build --profile production
```

## Deployment

### iOS App Store
```bash
eas submit --platform ios
```

### Google Play Store
```bash
eas submit --platform android
```

## Project Structure

```
mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Application screens
│   ├── navigation/         # Navigation configuration
│   ├── contexts/           # React contexts
│   ├── services/           # API services
│   ├── theme/              # Design system
│   └── utils/              # Utility functions
├── assets/                 # Static assets
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
└── package.json           # Dependencies
```

## API Integration

The mobile app connects to the BlackCnote backend API:

- **Development**: `http://localhost:5000`
- **Production**: `https://blackcnote-investment.replit.app`

## Security

- JWT token authentication
- Biometric authentication support
- Secure storage for sensitive data
- Certificate pinning for API requests

## Testing

```bash
# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
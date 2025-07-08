import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InvestmentsScreen from './src/screens/InvestmentsScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NewsScreen from './src/screens/NewsScreen';
import ReferralsScreen from './src/screens/ReferralsScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';

// Components
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { blackcnoteTheme } from './src/theme/theme';
import LoadingScreen from './src/screens/LoadingScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={blackcnoteTheme}>
            <ThemeProvider>
              <AuthProvider>
                <NavigationContainer>
                  <StatusBar style="light" backgroundColor="#1a1a1a" />
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      cardStyle: { backgroundColor: '#1a1a1a' },
                    }}
                  >
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                    <Stack.Screen name="Auth" component={AuthScreen} />
                    <Stack.Screen name="Main" component={BottomTabNavigator} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen name="Investments" component={InvestmentsScreen} />
                    <Stack.Screen name="Portfolio" component={PortfolioScreen} />
                    <Stack.Screen name="Calculator" component={CalculatorScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="News" component={NewsScreen} />
                    <Stack.Screen name="Referrals" component={ReferralsScreen} />
                    <Stack.Screen name="Transactions" component={TransactionsScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </AuthProvider>
            </ThemeProvider>
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
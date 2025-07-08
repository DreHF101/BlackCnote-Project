import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing } from '../theme/theme';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Navigate to appropriate screen based on authentication status
      setTimeout(() => {
        if (isAuthenticated) {
          navigation.navigate('Main' as never);
        } else {
          navigation.navigate('Auth' as never);
        }
      }, 1500);
    }
  }, [isLoading, isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: '/assets/img/hero-logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="headlineMedium" style={styles.title}>
          BlackCnote
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Investment Platform
        </Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text variant="bodyMedium" style={styles.loadingText}>
          Loading your investment portfolio...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default LoadingScreen;
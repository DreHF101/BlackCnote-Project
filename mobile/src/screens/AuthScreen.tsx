import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from 'react-native';
import { Text, TextInput, Button, Card, Divider, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, borderRadius } from '../theme/theme';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigation = useNavigation();
  const { login, register, checkBiometricSupport, authenticateWithBiometrics } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (isLogin) {
        await login({
          username: formData.username,
          password: formData.password,
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return;
        }
        await register(formData);
      }
      navigation.navigate('Main' as never);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const isSupported = await checkBiometricSupport();
      if (!isSupported) {
        Alert.alert('Error', 'Biometric authentication is not available on this device');
        return;
      }

      const success = await authenticateWithBiometrics();
      if (success) {
        navigation.navigate('Main' as never);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Biometric authentication failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: '/assets/img/hero-logo.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text variant="headlineMedium" style={styles.title}>
              {isLogin ? 'Welcome Back' : 'Join BlackCnote'}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {isLogin
                ? 'Sign in to your investment account'
                : 'Create your investment account today'}
            </Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Username"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                style={styles.input}
                autoCapitalize="none"
              />

              {!isLogin && (
                <TextInput
                  mode="outlined"
                  label="Email"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}

              <TextInput
                mode="outlined"
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                style={styles.input}
                secureTextEntry
              />

              {!isLogin && (
                <TextInput
                  mode="outlined"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  style={styles.input}
                  secureTextEntry
                />
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                style={styles.submitButton}
                contentStyle={styles.submitButtonContent}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              {isLogin && (
                <>
                  <Divider style={styles.divider} />
                  <Button
                    mode="outlined"
                    onPress={handleBiometricAuth}
                    icon="fingerprint"
                    style={styles.biometricButton}
                    contentStyle={styles.biometricButtonContent}
                  >
                    Use Biometric Authentication
                  </Button>
                </>
              )}
            </Card.Content>
          </Card>

          <View style={styles.footer}>
            <Text variant="bodyMedium" style={styles.footerText}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <Button
              mode="text"
              onPress={() => setIsLogin(!isLogin)}
              style={styles.switchButton}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </View>

          <View style={styles.socialContainer}>
            <Text variant="bodySmall" style={styles.socialText}>
              Or continue with
            </Text>
            <View style={styles.socialButtons}>
              <IconButton
                icon="google"
                size={24}
                iconColor={colors.text}
                style={styles.socialButton}
                onPress={() => Alert.alert('Coming Soon', 'Google authentication will be available soon')}
              />
              <IconButton
                icon="apple"
                size={24}
                iconColor={colors.text}
                style={styles.socialButton}
                onPress={() => Alert.alert('Coming Soon', 'Apple authentication will be available soon')}
              />
              <IconButton
                icon="facebook"
                size={24}
                iconColor={colors.text}
                style={styles.socialButton}
                onPress={() => Alert.alert('Coming Soon', 'Facebook authentication will be available soon')}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
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
  card: {
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.large,
  },
  input: {
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.medium,
  },
  submitButtonContent: {
    paddingVertical: spacing.xs,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  biometricButton: {
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
  },
  biometricButtonContent: {
    paddingVertical: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  footerText: {
    color: colors.textSecondary,
  },
  switchButton: {
    marginLeft: spacing.xs,
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialText: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xs,
  },
});

export default AuthScreen;
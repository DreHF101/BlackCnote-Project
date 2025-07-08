import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Avatar, List, Switch, Divider, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { colors, spacing, borderRadius } from '../theme/theme';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout, isBiometricEnabled, enableBiometricAuth, disableBiometricAuth } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleBiometricToggle = async () => {
    try {
      if (isBiometricEnabled) {
        await disableBiometricAuth();
        Alert.alert('Success', 'Biometric authentication disabled');
      } else {
        await enableBiometricAuth();
        Alert.alert('Success', 'Biometric authentication enabled');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to toggle biometric authentication');
    }
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // TODO: Implement notification settings
  };

  const profileMenuItems = [
    {
      title: 'Personal Information',
      description: 'Update your profile details',
      icon: 'account-edit',
      onPress: () => navigation.navigate('Settings' as never),
    },
    {
      title: 'Security Settings',
      description: 'Manage your account security',
      icon: 'shield-account',
      onPress: () => navigation.navigate('Settings' as never),
    },
    {
      title: 'Investment History',
      description: 'View your investment records',
      icon: 'chart-line',
      onPress: () => navigation.navigate('Investments' as never),
    },
    {
      title: 'Transaction History',
      description: 'Review your transactions',
      icon: 'swap-horizontal',
      onPress: () => navigation.navigate('Transactions' as never),
    },
    {
      title: 'Referral Program',
      description: 'Invite friends and earn rewards',
      icon: 'account-group',
      onPress: () => navigation.navigate('Referrals' as never),
    },
    {
      title: 'Help & Support',
      description: 'Get help and contact support',
      icon: 'help-circle',
      onPress: () => Alert.alert('Support', 'Contact support at support@blackcnote.com'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Profile
          </Text>
          <Button
            mode="text"
            icon="cog"
            onPress={() => navigation.navigate('Settings' as never)}
          >
            Settings
          </Button>
        </View>

        {/* Profile Info */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text
              size={80}
              label={user?.username?.charAt(0).toUpperCase() || 'U'}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text variant="headlineSmall" style={styles.username}>
                {user?.username || 'User'}
              </Text>
              <Text variant="bodyMedium" style={styles.email}>
                {user?.email || 'user@example.com'}
              </Text>
              <Text variant="bodySmall" style={styles.memberSince}>
                Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Quick Stats */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.statsTitle}>
              Quick Stats
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="titleMedium" style={styles.statValue}>
                  ${user?.balance || '0.00'}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Available Balance
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="titleMedium" style={styles.statValue}>
                  5
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Active Investments
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="titleMedium" style={styles.statValue}>
                  $2,450
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Total Returns
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.settingsTitle}>
              App Settings
            </Text>
            
            <List.Item
              title="Dark Mode"
              description="Enable dark theme"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  color={colors.primary}
                />
              )}
            />

            <Divider />

            <List.Item
              title="Biometric Authentication"
              description="Use fingerprint or face ID"
              left={(props) => <List.Icon {...props} icon="fingerprint" />}
              right={() => (
                <Switch
                  value={isBiometricEnabled}
                  onValueChange={handleBiometricToggle}
                  color={colors.primary}
                />
              )}
            />

            <Divider />

            <List.Item
              title="Push Notifications"
              description="Receive investment updates"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={handleNotificationsToggle}
                  color={colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.menuTitle}>
              Account Management
            </Text>
            {profileMenuItems.map((item, index) => (
              <View key={index}>
                <List.Item
                  title={item.title}
                  description={item.description}
                  left={(props) => <List.Icon {...props} icon={item.icon} />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" />}
                  onPress={item.onPress}
                  style={styles.menuItem}
                />
                {index < profileMenuItems.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* App Info */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoTitle}>
              App Information
            </Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text variant="bodyMedium" style={styles.infoLabel}>
                  Version
                </Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  1.0.0
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text variant="bodyMedium" style={styles.infoLabel}>
                  Build
                </Text>
                <Text variant="bodyMedium" style={styles.infoValue}>
                  2024.01.01
                </Text>
              </View>
            </View>
            <Button
              mode="text"
              onPress={() => Alert.alert('About', 'BlackCnote Investment Platform v1.0.0')}
              style={styles.aboutButton}
            >
              About BlackCnote
            </Button>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={colors.error}
            icon="logout"
          >
            Logout
          </Button>
        </View>
      </ScrollView>

      {/* Edit Profile FAB */}
      <FAB
        icon="account-edit"
        style={styles.fab}
        onPress={() => navigation.navigate('Settings' as never)}
        label="Edit"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    color: colors.text,
    fontWeight: 'bold',
  },
  profileCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginRight: spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  email: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  memberSince: {
    color: colors.textSecondary,
  },
  statsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  statsTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  settingsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  settingsTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  menuCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  menuTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  menuItem: {
    paddingVertical: spacing.xs,
  },
  infoCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  infoTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  infoValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  aboutButton: {
    alignSelf: 'center',
  },
  logoutSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  logoutButton: {
    borderColor: colors.error,
    borderRadius: borderRadius.medium,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
  },
});

export default ProfileScreen;
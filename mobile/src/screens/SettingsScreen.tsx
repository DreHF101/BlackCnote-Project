import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, TextInput, List, Switch, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, borderRadius } from '../theme/theme';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    // TODO: Implement password change
    Alert.alert('Success', 'Password changed successfully');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // TODO: Implement account deletion
          Alert.alert('Account Deleted', 'Your account has been deleted successfully');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            mode="text"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
          <Text variant="headlineMedium" style={styles.title}>
            Settings
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Information */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Profile Information
              </Text>
              <Button
                mode="text"
                onPress={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </View>

            <TextInput
              mode="outlined"
              label="Username"
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              style={styles.input}
              disabled={!isEditing}
            />

            <TextInput
              mode="outlined"
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              style={styles.input}
              disabled={!isEditing}
              keyboardType="email-address"
            />

            {isEditing && (
              <Button
                mode="contained"
                onPress={handleSaveProfile}
                style={styles.saveButton}
              >
                Save Changes
              </Button>
            )}
          </Card.Content>
        </Card>

        {/* Change Password */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Change Password
            </Text>

            <TextInput
              mode="outlined"
              label="Current Password"
              value={formData.currentPassword}
              onChangeText={(value) => handleInputChange('currentPassword', value)}
              style={styles.input}
              secureTextEntry
            />

            <TextInput
              mode="outlined"
              label="New Password"
              value={formData.newPassword}
              onChangeText={(value) => handleInputChange('newPassword', value)}
              style={styles.input}
              secureTextEntry
            />

            <TextInput
              mode="outlined"
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              style={styles.input}
              secureTextEntry
            />

            <Button
              mode="contained"
              onPress={handleChangePassword}
              style={styles.changePasswordButton}
              disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            >
              Change Password
            </Button>
          </Card.Content>
        </Card>

        {/* Privacy Settings */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Privacy Settings
            </Text>

            <List.Item
              title="Data Collection"
              description="Allow analytics data collection"
              left={(props) => <List.Icon {...props} icon="chart-bar" />}
              right={() => (
                <Switch
                  value={true}
                  onValueChange={() => {}}
                  color={colors.primary}
                />
              )}
            />

            <Divider />

            <List.Item
              title="Marketing Communications"
              description="Receive promotional emails"
              left={(props) => <List.Icon {...props} icon="email" />}
              right={() => (
                <Switch
                  value={false}
                  onValueChange={() => {}}
                  color={colors.primary}
                />
              )}
            />

            <Divider />

            <List.Item
              title="Third-party Sharing"
              description="Share data with partners"
              left={(props) => <List.Icon {...props} icon="share" />}
              right={() => (
                <Switch
                  value={false}
                  onValueChange={() => {}}
                  color={colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Account Actions */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Account Actions
            </Text>

            <List.Item
              title="Export Data"
              description="Download your account data"
              left={(props) => <List.Icon {...props} icon="download" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('Export', 'Data export feature coming soon')}
            />

            <Divider />

            <List.Item
              title="Account Verification"
              description="Verify your identity"
              left={(props) => <List.Icon {...props} icon="shield-check" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('Verification', 'Account verification feature coming soon')}
            />

            <Divider />

            <List.Item
              title="Two-Factor Authentication"
              description="Enable 2FA for extra security"
              left={(props) => <List.Icon {...props} icon="two-factor-authentication" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('2FA', 'Two-factor authentication feature coming soon')}
            />
          </Card.Content>
        </Card>

        {/* Support */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Support
            </Text>

            <List.Item
              title="Help Center"
              description="Browse frequently asked questions"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('Help', 'Help center feature coming soon')}
            />

            <Divider />

            <List.Item
              title="Contact Support"
              description="Get help from our team"
              left={(props) => <List.Icon {...props} icon="message" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('Support', 'Contact support at support@blackcnote.com')}
            />

            <Divider />

            <List.Item
              title="Send Feedback"
              description="Help us improve the app"
              left={(props) => <List.Icon {...props} icon="comment" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('Feedback', 'Feedback feature coming soon')}
            />
          </Card.Content>
        </Card>

        {/* Danger Zone */}
        <Card style={styles.dangerCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.dangerTitle}>
              Danger Zone
            </Text>
            <Text variant="bodyMedium" style={styles.dangerDescription}>
              Once you delete your account, there is no going back. Please be certain.
            </Text>
            <Button
              mode="outlined"
              onPress={handleDeleteAccount}
              style={styles.deleteButton}
              textColor={colors.error}
            >
              Delete Account
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
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
  placeholder: {
    width: 80,
  },
  sectionCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: spacing.md,
  },
  saveButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.medium,
  },
  changePasswordButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.medium,
  },
  dangerCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
    borderColor: colors.error,
    borderWidth: 1,
  },
  dangerTitle: {
    color: colors.error,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  dangerDescription: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  deleteButton: {
    borderColor: colors.error,
    borderRadius: borderRadius.medium,
  },
});

export default SettingsScreen;
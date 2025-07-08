import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Share, Alert } from 'react-native';
import { Text, Card, Button, TextInput, Avatar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, borderRadius } from '../theme/theme';

const ReferralsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [emailInput, setEmailInput] = useState('');

  const referralCode = user?.username ? `${user.username.toUpperCase()}123` : 'USER123';
  const referralLink = `https://blackcnote.com/register?ref=${referralCode}`;

  // Mock referral data
  const referralStats = {
    totalReferrals: 12,
    totalEarnings: 450.75,
    pendingEarnings: 125.30,
    thisMonth: 3,
  };

  const recentReferrals = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      joinDate: '2024-01-15',
      status: 'active',
      commission: 25.50,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      joinDate: '2024-01-12',
      status: 'pending',
      commission: 30.25,
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike@example.com',
      joinDate: '2024-01-10',
      status: 'active',
      commission: 40.00,
    },
  ];

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: `Join BlackCnote Investment Platform and start earning today! Use my referral code: ${referralCode}\n\n${referralLink}`,
        title: 'Join BlackCnote Investment Platform',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share referral link');
    }
  };

  const handleCopyLink = () => {
    // TODO: Implement clipboard functionality
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  const handleSendInvite = () => {
    if (!emailInput.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    
    // TODO: Implement email invitation
    Alert.alert('Invitation Sent!', `Invitation sent to ${emailInput}`);
    setEmailInput('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.secondary;
      case 'pending':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Referral Program
          </Text>
          <Button
            mode="text"
            icon="help-circle"
            onPress={() => Alert.alert('Help', 'Invite friends and earn commissions on their investments')}
          >
            Help
          </Button>
        </View>

        {/* Referral Stats */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.statsTitle}>
              Your Referral Stats
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Ionicons name="people" size={24} color={colors.primary} />
                <Text variant="titleMedium" style={styles.statValue}>
                  {referralStats.totalReferrals}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Total Referrals
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="cash" size={24} color={colors.secondary} />
                <Text variant="titleMedium" style={styles.statValue}>
                  ${referralStats.totalEarnings}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Total Earnings
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time" size={24} color={colors.warning} />
                <Text variant="titleMedium" style={styles.statValue}>
                  ${referralStats.pendingEarnings}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Pending Earnings
                </Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="calendar" size={24} color={colors.accent} />
                <Text variant="titleMedium" style={styles.statValue}>
                  {referralStats.thisMonth}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  This Month
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Referral Code */}
        <Card style={styles.referralCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.referralTitle}>
              Your Referral Code
            </Text>
            <View style={styles.referralCodeContainer}>
              <View style={styles.codeBox}>
                <Text variant="headlineSmall" style={styles.referralCodeText}>
                  {referralCode}
                </Text>
              </View>
              <Button
                mode="contained"
                onPress={handleCopyLink}
                style={styles.copyButton}
                icon="content-copy"
              >
                Copy
              </Button>
            </View>
            <Text variant="bodyMedium" style={styles.referralDescription}>
              Share this code with friends to earn commissions on their investments
            </Text>
          </Card.Content>
        </Card>

        {/* Share Options */}
        <Card style={styles.shareCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.shareTitle}>
              Share Your Referral
            </Text>
            <View style={styles.shareButtons}>
              <Button
                mode="contained"
                onPress={handleShareReferral}
                style={styles.shareButton}
                icon="share"
              >
                Share Link
              </Button>
              <Button
                mode="outlined"
                onPress={() => Alert.alert('Coming Soon', 'Social media sharing coming soon')}
                style={styles.shareButton}
                icon="facebook"
              >
                Facebook
              </Button>
              <Button
                mode="outlined"
                onPress={() => Alert.alert('Coming Soon', 'Social media sharing coming soon')}
                style={styles.shareButton}
                icon="twitter"
              >
                Twitter
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Email Invitation */}
        <Card style={styles.inviteCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.inviteTitle}>
              Invite by Email
            </Text>
            <TextInput
              mode="outlined"
              label="Friend's Email"
              value={emailInput}
              onChangeText={setEmailInput}
              style={styles.emailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter email address"
            />
            <Button
              mode="contained"
              onPress={handleSendInvite}
              style={styles.inviteButton}
              icon="email"
              disabled={!emailInput.trim()}
            >
              Send Invitation
            </Button>
          </Card.Content>
        </Card>

        {/* Commission Structure */}
        <Card style={styles.commissionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.commissionTitle}>
              Commission Structure
            </Text>
            <View style={styles.commissionLevels}>
              <View style={styles.commissionLevel}>
                <View style={styles.levelIcon}>
                  <Text variant="titleMedium" style={styles.levelNumber}>
                    1
                  </Text>
                </View>
                <View style={styles.levelDetails}>
                  <Text variant="titleMedium" style={styles.levelTitle}>
                    Direct Referrals
                  </Text>
                  <Text variant="bodyMedium" style={styles.levelDescription}>
                    Earn 5% commission on direct referral investments
                  </Text>
                </View>
                <Text variant="titleMedium" style={styles.levelRate}>
                  5%
                </Text>
              </View>
              <View style={styles.commissionLevel}>
                <View style={styles.levelIcon}>
                  <Text variant="titleMedium" style={styles.levelNumber}>
                    2
                  </Text>
                </View>
                <View style={styles.levelDetails}>
                  <Text variant="titleMedium" style={styles.levelTitle}>
                    Second Level
                  </Text>
                  <Text variant="bodyMedium" style={styles.levelDescription}>
                    Earn 2% commission on second level investments
                  </Text>
                </View>
                <Text variant="titleMedium" style={styles.levelRate}>
                  2%
                </Text>
              </View>
              <View style={styles.commissionLevel}>
                <View style={styles.levelIcon}>
                  <Text variant="titleMedium" style={styles.levelNumber}>
                    3
                  </Text>
                </View>
                <View style={styles.levelDetails}>
                  <Text variant="titleMedium" style={styles.levelTitle}>
                    Third Level
                  </Text>
                  <Text variant="bodyMedium" style={styles.levelDescription}>
                    Earn 1% commission on third level investments
                  </Text>
                </View>
                <Text variant="titleMedium" style={styles.levelRate}>
                  1%
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Referrals */}
        <Card style={styles.referralsListCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.referralsListTitle}>
              Recent Referrals
            </Text>
            {recentReferrals.map((referral) => (
              <View key={referral.id} style={styles.referralItem}>
                <Avatar.Text
                  size={48}
                  label={referral.name.split(' ').map(n => n[0]).join('')}
                  style={styles.referralAvatar}
                />
                <View style={styles.referralDetails}>
                  <Text variant="titleMedium" style={styles.referralName}>
                    {referral.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.referralEmail}>
                    {referral.email}
                  </Text>
                  <Text variant="bodySmall" style={styles.referralDate}>
                    Joined: {new Date(referral.joinDate).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.referralStatus}>
                  <Chip
                    style={[
                      styles.statusChip,
                      { backgroundColor: getStatusColor(referral.status) }
                    ]}
                    textStyle={styles.statusText}
                  >
                    {referral.status.toUpperCase()}
                  </Chip>
                  <Text variant="bodyMedium" style={styles.commissionAmount}>
                    ${referral.commission}
                  </Text>
                </View>
              </View>
            ))}
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statValue: {
    color: colors.text,
    fontWeight: 'bold',
    marginVertical: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  referralCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  referralTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  codeBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginRight: spacing.md,
  },
  referralCodeText: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  copyButton: {
    borderRadius: borderRadius.medium,
  },
  referralDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  shareCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  shareTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  shareButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.xs,
    borderRadius: borderRadius.medium,
  },
  inviteCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  inviteTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  emailInput: {
    marginBottom: spacing.md,
  },
  inviteButton: {
    borderRadius: borderRadius.medium,
  },
  commissionCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  commissionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  commissionLevels: {
    marginBottom: spacing.md,
  },
  commissionLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  levelNumber: {
    color: colors.background,
    fontWeight: 'bold',
  },
  levelDetails: {
    flex: 1,
  },
  levelTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  levelDescription: {
    color: colors.textSecondary,
  },
  levelRate: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  referralsListCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  referralsListTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  referralItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  referralAvatar: {
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  referralDetails: {
    flex: 1,
  },
  referralName: {
    color: colors.text,
    fontWeight: 'bold',
  },
  referralEmail: {
    color: colors.textSecondary,
  },
  referralDate: {
    color: colors.textSecondary,
  },
  referralStatus: {
    alignItems: 'flex-end',
  },
  statusChip: {
    height: 24,
    marginBottom: spacing.xs,
  },
  statusText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  commissionAmount: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
});

export default ReferralsScreen;
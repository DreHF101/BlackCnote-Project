import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Text, Card, Button, Chip, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/api';
import { colors, spacing, borderRadius } from '../theme/theme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { data: portfolioData, isLoading, refetch } = useQuery({
    queryKey: ['portfolio', user?.id],
    queryFn: () => user ? ApiService.getUserPortfolio(user.id) : null,
    enabled: !!user,
  });

  const { data: investmentPlans } = useQuery({
    queryKey: ['investment-plans'],
    queryFn: ApiService.getInvestmentPlans,
  });

  const handleInvestNow = () => {
    navigation.navigate('Investments' as never);
  };

  const handleViewPortfolio = () => {
    navigation.navigate('Portfolio' as never);
  };

  const handleQuickInvest = (planId: number) => {
    navigation.navigate('Calculator' as never, { planId });
  };

  const stats = [
    {
      title: 'Total Balance',
      value: `$${portfolioData?.user?.balance || '0.00'}`,
      icon: 'wallet',
      color: colors.primary,
    },
    {
      title: 'Total Invested',
      value: `$${portfolioData?.portfolio?.totalInvested || '0.00'}`,
      icon: 'trending-up',
      color: colors.secondary,
    },
    {
      title: 'Total Returns',
      value: `$${portfolioData?.portfolio?.totalReturns || '0.00'}`,
      icon: 'cash',
      color: colors.accent,
    },
    {
      title: 'Active Plans',
      value: portfolioData?.portfolio?.activeInvestments || '0',
      icon: 'documents',
      color: colors.warning,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="headlineSmall" style={styles.welcomeText}>
              Welcome back,
            </Text>
            <Text variant="headlineMedium" style={styles.nameText}>
              {user?.username || 'Investor'}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <Button
              mode="text"
              icon="bell"
              onPress={() => Alert.alert('Notifications', 'No new notifications')}
              style={styles.notificationButton}
            />
          </View>
        </View>

        {/* Portfolio Summary */}
        <LinearGradient
          colors={colors.gradient.primary}
          style={styles.portfolioCard}
        >
          <Text variant="titleLarge" style={styles.portfolioTitle}>
            Portfolio Overview
          </Text>
          <Text variant="headlineLarge" style={styles.portfolioValue}>
            ${portfolioData?.portfolio?.total || '0.00'}
          </Text>
          <View style={styles.portfolioActions}>
            <Button
              mode="contained"
              onPress={handleInvestNow}
              style={styles.investButton}
              buttonColor={colors.background}
              textColor={colors.primary}
            >
              Invest Now
            </Button>
            <Button
              mode="outlined"
              onPress={handleViewPortfolio}
              style={styles.viewButton}
              textColor={colors.background}
            >
              View Details
            </Button>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <View style={styles.statHeader}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                  <Text variant="bodySmall" style={styles.statTitle}>
                    {stat.title}
                  </Text>
                </View>
                <Text variant="titleLarge" style={styles.statValue}>
                  {stat.value}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <Button
              mode="contained"
              icon="calculator"
              onPress={() => navigation.navigate('Calculator' as never)}
              style={styles.actionButton}
            >
              Calculator
            </Button>
            <Button
              mode="contained"
              icon="chart-line"
              onPress={() => navigation.navigate('Analytics' as never)}
              style={styles.actionButton}
            >
              Analytics
            </Button>
            <Button
              mode="contained"
              icon="swap-horizontal"
              onPress={() => navigation.navigate('Transactions' as never)}
              style={styles.actionButton}
            >
              Transactions
            </Button>
          </View>
        </View>

        {/* Featured Investment Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Featured Plans
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Investments' as never)}
            >
              View All
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {investmentPlans?.slice(0, 3).map((plan: any) => (
              <Card key={plan.id} style={styles.planCard}>
                <Card.Content>
                  <View style={styles.planHeader}>
                    <Text variant="titleMedium" style={styles.planName}>
                      {plan.name}
                    </Text>
                    <Chip style={styles.planChip}>
                      {plan.apyRate}% APY
                    </Chip>
                  </View>
                  <Text variant="bodyMedium" style={styles.planDescription}>
                    {plan.description}
                  </Text>
                  <View style={styles.planDetails}>
                    <Text variant="bodySmall" style={styles.planDetail}>
                      Min: ${plan.minimumAmount}
                    </Text>
                    <Text variant="bodySmall" style={styles.planDetail}>
                      Duration: {plan.durationDays} days
                    </Text>
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => handleQuickInvest(plan.id)}
                    style={styles.planButton}
                    size="small"
                  >
                    Invest Now
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Market News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Market News
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('News' as never)}
            >
              View All
            </Button>
          </View>
          <Card style={styles.newsCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.newsTitle}>
                Investment Market Update
              </Text>
              <Text variant="bodyMedium" style={styles.newsContent}>
                Stay updated with the latest market trends and investment opportunities...
              </Text>
              <Text variant="bodySmall" style={styles.newsDate}>
                2 hours ago
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Investments' as never)}
        label="Invest"
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
  welcomeText: {
    color: colors.textSecondary,
  },
  nameText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  notificationButton: {
    margin: 0,
  },
  portfolioCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
  },
  portfolioTitle: {
    color: colors.background,
    marginBottom: spacing.xs,
  },
  portfolioValue: {
    color: colors.background,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  portfolioActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  investButton: {
    flex: 1,
  },
  viewButton: {
    flex: 1,
    borderColor: colors.background,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%',
    marginBottom: spacing.md,
    marginHorizontal: '1%',
    backgroundColor: colors.surface,
  },
  statContent: {
    padding: spacing.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statTitle: {
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  statValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  planCard: {
    width: 250,
    marginRight: spacing.md,
    marginLeft: spacing.lg,
    backgroundColor: colors.surface,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  planName: {
    color: colors.text,
    fontWeight: 'bold',
    flex: 1,
  },
  planChip: {
    backgroundColor: colors.primary,
  },
  planDescription: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  planDetail: {
    color: colors.textSecondary,
  },
  planButton: {
    marginTop: spacing.xs,
  },
  newsCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  newsTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  newsContent: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  newsDate: {
    color: colors.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
  },
});

export default HomeScreen;
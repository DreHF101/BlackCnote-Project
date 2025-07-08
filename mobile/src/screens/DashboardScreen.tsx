import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Text, Card, Button, Divider, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/api';
import { hyipLabApi, type HYIPLabUserStats } from '../services/hyiplab-api';
import { colors, spacing, borderRadius } from '../theme/theme';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const { data: portfolioData, isLoading, refetch } = useQuery({
    queryKey: ['portfolio', user?.id],
    queryFn: () => user ? ApiService.getUserPortfolio(user.id) : null,
    enabled: !!user,
  });

  const { data: investmentsData } = useQuery({
    queryKey: ['investments', user?.id],
    queryFn: () => user ? ApiService.getUserInvestments(user.id) : null,
    enabled: !!user,
  });

  const { data: transactionsData } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => user ? ApiService.getUserTransactions(user.id) : null,
    enabled: !!user,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Chart data
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [1000, 1200, 1400, 1600, 1800, 2000],
        color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Starter Plan',
      population: 35,
      color: colors.primary,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Growth Plan',
      population: 45,
      color: colors.secondary,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Premium Plan',
      population: 20,
      color: colors.accent,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: borderRadius.large,
    },
  };

  const activeInvestments = investmentsData?.filter((inv: any) => inv.status === 'active') || [];
  const recentTransactions = transactionsData?.slice(0, 5) || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Dashboard
          </Text>
          <Button
            mode="text"
            icon="chart-line"
            onPress={() => navigation.navigate('Analytics' as never)}
          >
            Analytics
          </Button>
        </View>

        {/* Portfolio Summary Cards */}
        <View style={styles.summaryCards}>
          <Card style={styles.summaryCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Ionicons name="wallet" size={24} color={colors.primary} />
                <Text variant="bodySmall" style={styles.cardLabel}>
                  Total Balance
                </Text>
              </View>
              <Text variant="headlineSmall" style={styles.cardValue}>
                ${portfolioData?.user?.balance || '0.00'}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Ionicons name="trending-up" size={24} color={colors.secondary} />
                <Text variant="bodySmall" style={styles.cardLabel}>
                  Total Returns
                </Text>
              </View>
              <Text variant="headlineSmall" style={styles.cardValue}>
                ${portfolioData?.portfolio?.totalReturns || '0.00'}
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Portfolio Performance Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Portfolio Performance
            </Text>
            <LineChart
              data={lineChartData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Investment Distribution */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Investment Distribution
            </Text>
            <PieChart
              data={pieChartData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        {/* Active Investments */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Active Investments
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Investments' as never)}
              >
                View All
              </Button>
            </View>
            {activeInvestments.length > 0 ? (
              activeInvestments.slice(0, 3).map((investment: any, index: number) => (
                <View key={investment.id} style={styles.investmentItem}>
                  <View style={styles.investmentHeader}>
                    <Text variant="titleMedium" style={styles.investmentTitle}>
                      Investment #{investment.id}
                    </Text>
                    <Text variant="bodyMedium" style={styles.investmentAmount}>
                      ${investment.amount}
                    </Text>
                  </View>
                  <View style={styles.investmentProgress}>
                    <Text variant="bodySmall" style={styles.progressLabel}>
                      Returns: ${investment.currentReturns}
                    </Text>
                    <ProgressBar
                      progress={0.65}
                      color={colors.primary}
                      style={styles.progressBar}
                    />
                  </View>
                  {index < activeInvestments.length - 1 && <Divider style={styles.divider} />}
                </View>
              ))
            ) : (
              <Text variant="bodyMedium" style={styles.emptyText}>
                No active investments yet
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Recent Transactions */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Recent Transactions
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Transactions' as never)}
              >
                View All
              </Button>
            </View>
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction: any, index: number) => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={styles.transactionIcon}>
                    <Ionicons
                      name={transaction.type === 'deposit' ? 'arrow-down' : 'arrow-up'}
                      size={20}
                      color={transaction.type === 'deposit' ? colors.secondary : colors.primary}
                    />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text variant="bodyMedium" style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                    <Text variant="bodySmall" style={styles.transactionDate}>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.transactionAmount,
                      {
                        color: transaction.amount.startsWith('-') ? colors.error : colors.secondary,
                      },
                    ]}
                  >
                    ${transaction.amount}
                  </Text>
                </View>
              ))
            ) : (
              <Text variant="bodyMedium" style={styles.emptyText}>
                No recent transactions
              </Text>
            )}
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
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.surface,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardLabel: {
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  cardValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  chartCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  chartTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  chart: {
    borderRadius: borderRadius.medium,
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
  investmentItem: {
    paddingVertical: spacing.md,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  investmentTitle: {
    color: colors.text,
  },
  investmentAmount: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  investmentProgress: {
    marginTop: spacing.xs,
  },
  progressLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  divider: {
    marginTop: spacing.md,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    color: colors.text,
    marginBottom: spacing.xs,
  },
  transactionDate: {
    color: colors.textSecondary,
  },
  transactionAmount: {
    fontWeight: 'bold',
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
});

export default DashboardScreen;
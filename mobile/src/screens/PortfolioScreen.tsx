import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Text, Card, Button, Chip, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/api';
import { colors, spacing, borderRadius } from '../theme/theme';

const { width } = Dimensions.get('window');

const PortfolioScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
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

  const { data: portfolioHistory } = useQuery({
    queryKey: ['portfolio-history', user?.id],
    queryFn: () => user ? ApiService.getUserPortfolioHistory(user.id) : null,
    enabled: !!user,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const periodOptions = [
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '6M', label: '6M' },
    { value: '1Y', label: '1Y' },
  ];

  // Chart configurations
  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: borderRadius.large,
    },
  };

  // Performance chart data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [1000, 1200, 1400, 1600, 1800, 2000],
        color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  // Investment distribution data
  const distributionData = [
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

  // Monthly returns data
  const monthlyReturnsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 180, 240, 300, 360, 420],
      },
    ],
  };

  const portfolio = portfolioData?.portfolio || {};
  const totalValue = parseFloat(portfolio.total || '0');
  const totalInvested = parseFloat(portfolio.totalInvested || '0');
  const totalReturns = parseFloat(portfolio.totalReturns || '0');
  const returnPercentage = totalInvested > 0 ? ((totalReturns / totalInvested) * 100).toFixed(2) : '0';

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
            Portfolio
          </Text>
          <Button
            mode="text"
            icon="share"
            onPress={() => {}}
          >
            Share
          </Button>
        </View>

        {/* Portfolio Overview */}
        <Card style={styles.overviewCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.overviewTitle}>
              Total Portfolio Value
            </Text>
            <Text variant="headlineLarge" style={styles.portfolioValue}>
              ${totalValue.toLocaleString()}
            </Text>
            <View style={styles.performanceIndicator}>
              <Ionicons
                name={totalReturns >= 0 ? 'trending-up' : 'trending-down'}
                size={20}
                color={totalReturns >= 0 ? colors.secondary : colors.error}
              />
              <Text
                variant="bodyMedium"
                style={[
                  styles.performanceText,
                  { color: totalReturns >= 0 ? colors.secondary : colors.error }
                ]}
              >
                {returnPercentage}% ({totalReturns >= 0 ? '+' : ''}${totalReturns.toFixed(2)})
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Portfolio Summary */}
        <View style={styles.summaryGrid}>
          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Ionicons name="wallet" size={24} color={colors.accent} />
              <Text variant="bodySmall" style={styles.summaryLabel}>
                Total Invested
              </Text>
              <Text variant="titleMedium" style={styles.summaryValue}>
                ${totalInvested.toLocaleString()}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Ionicons name="trending-up" size={24} color={colors.secondary} />
              <Text variant="bodySmall" style={styles.summaryLabel}>
                Total Returns
              </Text>
              <Text variant="titleMedium" style={styles.summaryValue}>
                ${totalReturns.toLocaleString()}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Ionicons name="documents" size={24} color={colors.primary} />
              <Text variant="bodySmall" style={styles.summaryLabel}>
                Active Plans
              </Text>
              <Text variant="titleMedium" style={styles.summaryValue}>
                {portfolio.activeInvestments || 0}
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Ionicons name="cash" size={24} color={colors.warning} />
              <Text variant="bodySmall" style={styles.summaryLabel}>
                Available Balance
              </Text>
              <Text variant="titleMedium" style={styles.summaryValue}>
                ${portfolioData?.user?.balance || '0'}
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Performance Chart */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <View style={styles.chartHeader}>
              <Text variant="titleLarge" style={styles.chartTitle}>
                Performance Overview
              </Text>
              <SegmentedButtons
                value={selectedPeriod}
                onValueChange={setSelectedPeriod}
                buttons={periodOptions}
                style={styles.periodSelector}
              />
            </View>
            <LineChart
              data={performanceData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              withDots={true}
              withShadow={false}
              bezier
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
              data={distributionData}
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

        {/* Monthly Returns */}
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Monthly Returns
            </Text>
            <BarChart
              data={monthlyReturnsData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              yAxisLabel="$"
              showValuesOnTopOfBars={true}
            />
          </Card.Content>
        </Card>

        {/* Investment Breakdown */}
        <Card style={styles.breakdownCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.chartTitle}>
              Investment Breakdown
            </Text>
            {investmentsData && investmentsData.length > 0 ? (
              investmentsData.map((investment: any, index: number) => (
                <View key={investment.id} style={styles.investmentItem}>
                  <View style={styles.investmentInfo}>
                    <Text variant="titleMedium" style={styles.investmentName}>
                      Investment #{investment.id}
                    </Text>
                    <Text variant="bodySmall" style={styles.investmentDate}>
                      {new Date(investment.startDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.investmentStats}>
                    <Text variant="bodyMedium" style={styles.investmentAmount}>
                      ${investment.amount}
                    </Text>
                    <Chip
                      style={[
                        styles.investmentChip,
                        {
                          backgroundColor: investment.status === 'active' ? colors.secondary : colors.textSecondary
                        }
                      ]}
                      textStyle={styles.chipText}
                    >
                      {investment.status.toUpperCase()}
                    </Chip>
                  </View>
                </View>
              ))
            ) : (
              <Text variant="bodyMedium" style={styles.emptyText}>
                No investments found
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Investments' as never)}
            style={styles.actionButton}
            icon="plus"
          >
            New Investment
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Transactions' as never)}
            style={styles.actionButton}
            icon="swap-horizontal"
          >
            View Transactions
          </Button>
        </View>
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
  overviewCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  overviewTitle: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  portfolioValue: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  performanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceText: {
    marginLeft: spacing.xs,
    fontWeight: 'bold',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    width: '48%',
    marginBottom: spacing.md,
    marginHorizontal: '1%',
    backgroundColor: colors.surface,
  },
  summaryContent: {
    alignItems: 'center',
    padding: spacing.md,
  },
  summaryLabel: {
    color: colors.textSecondary,
    marginVertical: spacing.xs,
    textAlign: 'center',
  },
  summaryValue: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chartCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  chartTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  periodSelector: {
    flexDirection: 'row',
  },
  chart: {
    borderRadius: borderRadius.medium,
  },
  breakdownCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  investmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    color: colors.text,
    fontWeight: 'bold',
  },
  investmentDate: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  investmentStats: {
    alignItems: 'flex-end',
  },
  investmentAmount: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  investmentChip: {
    height: 24,
  },
  chipText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.medium,
  },
});

export default PortfolioScreen;
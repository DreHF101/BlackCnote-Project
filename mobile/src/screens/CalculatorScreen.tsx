import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, TextInput, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { ApiService } from '../services/api';
import { colors, spacing, borderRadius } from '../theme/theme';

const CalculatorScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { planId } = route.params as any || {};

  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [results, setResults] = useState<any>(null);

  const { data: investmentPlans, isLoading } = useQuery({
    queryKey: ['investment-plans'],
    queryFn: ApiService.getInvestmentPlans,
  });

  useEffect(() => {
    if (investmentPlans && planId) {
      const plan = investmentPlans.find((p: any) => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, [investmentPlans, planId]);

  const calculateReturns = () => {
    if (!selectedPlan || !amount) {
      Alert.alert('Error', 'Please select a plan and enter an amount');
      return;
    }

    const principal = parseFloat(amount);
    const apyRate = parseFloat(selectedPlan.apyRate) / 100;
    const duration = customDuration ? parseInt(customDuration) : selectedPlan.durationDays;

    if (principal < parseFloat(selectedPlan.minimumAmount)) {
      Alert.alert('Error', `Minimum investment amount is $${selectedPlan.minimumAmount}`);
      return;
    }

    if (principal > parseFloat(selectedPlan.maximumAmount)) {
      Alert.alert('Error', `Maximum investment amount is $${selectedPlan.maximumAmount}`);
      return;
    }

    // Calculate compound interest
    const dailyRate = apyRate / 365;
    const compoundAmount = principal * Math.pow(1 + dailyRate, duration);
    const totalReturns = compoundAmount - principal;
    const dailyReturns = totalReturns / duration;

    // Calculate milestones
    const milestones = [];
    for (let i = 1; i <= Math.min(duration, 12); i++) {
      const days = Math.floor((duration / 12) * i);
      const milestoneAmount = principal * Math.pow(1 + dailyRate, days);
      milestones.push({
        period: `${days} days`,
        amount: milestoneAmount.toFixed(2),
        returns: (milestoneAmount - principal).toFixed(2),
      });
    }

    setResults({
      principal: principal.toFixed(2),
      totalAmount: compoundAmount.toFixed(2),
      totalReturns: totalReturns.toFixed(2),
      dailyReturns: dailyReturns.toFixed(2),
      duration,
      apyRate: selectedPlan.apyRate,
      milestones,
    });
  };

  const handleInvestNow = () => {
    if (!selectedPlan || !amount) {
      Alert.alert('Error', 'Please complete the calculation first');
      return;
    }

    navigation.navigate('Investments' as never, {
      planId: selectedPlan.id,
      amount: amount,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Investment Calculator
          </Text>
          <Button
            mode="text"
            icon="help-circle"
            onPress={() => Alert.alert('Help', 'Calculate potential returns from your investments')}
          >
            Help
          </Button>
        </View>

        {/* Plan Selection */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Select Investment Plan
            </Text>
            {investmentPlans && (
              <View style={styles.planSelector}>
                {investmentPlans.map((plan: any) => (
                  <Button
                    key={plan.id}
                    mode={selectedPlan?.id === plan.id ? 'contained' : 'outlined'}
                    onPress={() => setSelectedPlan(plan)}
                    style={[
                      styles.planButton,
                      selectedPlan?.id === plan.id && styles.selectedPlanButton
                    ]}
                  >
                    {plan.name}
                  </Button>
                ))}
              </View>
            )}

            {selectedPlan && (
              <Card style={styles.planDetailsCard}>
                <Card.Content>
                  <View style={styles.planHeader}>
                    <Text variant="titleMedium" style={styles.planName}>
                      {selectedPlan.name}
                    </Text>
                    <Chip style={styles.apyChip} textStyle={styles.chipText}>
                      {selectedPlan.apyRate}% APY
                    </Chip>
                  </View>
                  <Text variant="bodyMedium" style={styles.planDescription}>
                    {selectedPlan.description}
                  </Text>
                  <View style={styles.planMetrics}>
                    <View style={styles.metric}>
                      <Text variant="bodySmall" style={styles.metricLabel}>
                        Duration
                      </Text>
                      <Text variant="bodyMedium" style={styles.metricValue}>
                        {selectedPlan.durationDays} days
                      </Text>
                    </View>
                    <View style={styles.metric}>
                      <Text variant="bodySmall" style={styles.metricLabel}>
                        Min Amount
                      </Text>
                      <Text variant="bodyMedium" style={styles.metricValue}>
                        ${selectedPlan.minimumAmount}
                      </Text>
                    </View>
                    <View style={styles.metric}>
                      <Text variant="bodySmall" style={styles.metricLabel}>
                        Max Amount
                      </Text>
                      <Text variant="bodyMedium" style={styles.metricValue}>
                        ${selectedPlan.maximumAmount}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
          </Card.Content>
        </Card>

        {/* Investment Amount */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Investment Amount
            </Text>
            <TextInput
              mode="outlined"
              label="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              placeholder={selectedPlan ? `$${selectedPlan.minimumAmount} - $${selectedPlan.maximumAmount}` : 'Select a plan first'}
              disabled={!selectedPlan}
              left={<TextInput.Icon icon="currency-usd" />}
            />

            {selectedPlan && (
              <View style={styles.quickAmounts}>
                <Text variant="bodyMedium" style={styles.quickAmountLabel}>
                  Quick amounts:
                </Text>
                <View style={styles.quickAmountButtons}>
                  {['100', '500', '1000', '5000'].map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      mode="outlined"
                      onPress={() => setAmount(quickAmount)}
                      style={styles.quickAmountButton}
                      compact
                    >
                      ${quickAmount}
                    </Button>
                  ))}
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Custom Duration */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Custom Duration (Optional)
            </Text>
            <TextInput
              mode="outlined"
              label="Custom duration in days"
              value={customDuration}
              onChangeText={setCustomDuration}
              keyboardType="numeric"
              style={styles.input}
              placeholder={selectedPlan ? `Default: ${selectedPlan.durationDays} days` : 'Select a plan first'}
              left={<TextInput.Icon icon="calendar" />}
            />
            <Text variant="bodySmall" style={styles.helperText}>
              Leave empty to use the plan's default duration
            </Text>
          </Card.Content>
        </Card>

        {/* Calculate Button */}
        <View style={styles.calculateSection}>
          <Button
            mode="contained"
            onPress={calculateReturns}
            style={styles.calculateButton}
            contentStyle={styles.calculateButtonContent}
            disabled={!selectedPlan || !amount}
            icon="calculator"
          >
            Calculate Returns
          </Button>
        </View>

        {/* Results */}
        {results && (
          <Card style={styles.resultsCard}>
            <Card.Content>
              <View style={styles.resultsHeader}>
                <Text variant="titleLarge" style={styles.resultsTitle}>
                  Calculation Results
                </Text>
                <Ionicons name="trending-up" size={24} color={colors.secondary} />
              </View>

              <View style={styles.resultsSummary}>
                <View style={styles.resultItem}>
                  <Text variant="bodySmall" style={styles.resultLabel}>
                    Initial Investment
                  </Text>
                  <Text variant="titleMedium" style={styles.resultValue}>
                    ${results.principal}
                  </Text>
                </View>
                <View style={styles.resultItem}>
                  <Text variant="bodySmall" style={styles.resultLabel}>
                    Total Returns
                  </Text>
                  <Text variant="titleMedium" style={[styles.resultValue, { color: colors.secondary }]}>
                    ${results.totalReturns}
                  </Text>
                </View>
                <View style={styles.resultItem}>
                  <Text variant="bodySmall" style={styles.resultLabel}>
                    Final Amount
                  </Text>
                  <Text variant="titleLarge" style={[styles.resultValue, { color: colors.primary }]}>
                    ${results.totalAmount}
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.resultDetails}>
                <View style={styles.detailRow}>
                  <Text variant="bodyMedium" style={styles.detailLabel}>
                    Daily Returns:
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    ${results.dailyReturns}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text variant="bodyMedium" style={styles.detailLabel}>
                    Investment Period:
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {results.duration} days
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text variant="bodyMedium" style={styles.detailLabel}>
                    APY Rate:
                  </Text>
                  <Text variant="bodyMedium" style={styles.detailValue}>
                    {results.apyRate}%
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <Text variant="titleMedium" style={styles.milestonesTitle}>
                Growth Milestones
              </Text>
              <View style={styles.milestones}>
                {results.milestones.slice(0, 6).map((milestone: any, index: number) => (
                  <View key={index} style={styles.milestoneItem}>
                    <Text variant="bodySmall" style={styles.milestonePeriod}>
                      {milestone.period}
                    </Text>
                    <Text variant="bodyMedium" style={styles.milestoneAmount}>
                      ${milestone.amount}
                    </Text>
                    <Text variant="bodySmall" style={styles.milestoneReturns}>
                      +${milestone.returns}
                    </Text>
                  </View>
                ))}
              </View>

              <Button
                mode="contained"
                onPress={handleInvestNow}
                style={styles.investNowButton}
                icon="plus"
              >
                Invest Now
              </Button>
            </Card.Content>
          </Card>
        )}
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
  sectionCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  planSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  planButton: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderRadius: borderRadius.medium,
  },
  selectedPlanButton: {
    backgroundColor: colors.primary,
  },
  planDetailsCard: {
    backgroundColor: colors.background,
    marginTop: spacing.md,
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
  },
  apyChip: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.background,
    fontSize: 12,
  },
  planDescription: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  planMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  metricValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: spacing.md,
  },
  quickAmounts: {
    marginTop: spacing.md,
  },
  quickAmountLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  quickAmountButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickAmountButton: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderRadius: borderRadius.small,
  },
  helperText: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  calculateSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  calculateButton: {
    borderRadius: borderRadius.medium,
  },
  calculateButtonContent: {
    paddingVertical: spacing.xs,
  },
  resultsCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  resultsTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  resultsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  resultItem: {
    alignItems: 'center',
  },
  resultLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resultValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: spacing.md,
  },
  resultDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    color: colors.textSecondary,
  },
  detailValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  milestonesTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  milestones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  milestoneItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  milestonePeriod: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  milestoneAmount: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  milestoneReturns: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  investNowButton: {
    borderRadius: borderRadius.medium,
    marginTop: spacing.md,
  },
});

export default CalculatorScreen;
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { Text, Card, Button, Chip, Modal, Portal, TextInput, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/api';
import { colors, spacing, borderRadius } from '../theme/theme';

const InvestmentsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const { data: investmentPlans, isLoading: plansLoading } = useQuery({
    queryKey: ['investment-plans'],
    queryFn: ApiService.getInvestmentPlans,
  });

  const { data: userInvestments, refetch: refetchInvestments } = useQuery({
    queryKey: ['investments', user?.id],
    queryFn: () => user ? ApiService.getUserInvestments(user.id) : null,
    enabled: !!user,
  });

  const investMutation = useMutation({
    mutationFn: ApiService.createInvestment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['portfolio', user?.id] });
      setShowInvestModal(false);
      setInvestmentAmount('');
      setSelectedPlan(null);
      Alert.alert('Success', 'Investment created successfully!');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to create investment');
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchInvestments();
    setRefreshing(false);
  };

  const handleInvestNow = (plan: any) => {
    setSelectedPlan(plan);
    setShowInvestModal(true);
  };

  const handleInvestment = () => {
    if (!selectedPlan || !investmentAmount || !user) return;

    const amount = parseFloat(investmentAmount);
    if (amount < parseFloat(selectedPlan.minimumAmount)) {
      Alert.alert('Error', `Minimum investment amount is $${selectedPlan.minimumAmount}`);
      return;
    }

    if (amount > parseFloat(selectedPlan.maximumAmount)) {
      Alert.alert('Error', `Maximum investment amount is $${selectedPlan.maximumAmount}`);
      return;
    }

    investMutation.mutate({
      userId: user.id,
      planId: selectedPlan.id,
      amount: investmentAmount,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.secondary;
      case 'completed':
        return colors.primary;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const calculateProgress = (investment: any) => {
    const startDate = new Date(investment.startDate);
    const endDate = new Date(investment.endDate);
    const now = new Date();
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    return Math.min(Math.max(elapsed / totalDuration, 0), 1);
  };

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
            Investment Plans
          </Text>
          <Button
            mode="text"
            icon="calculator"
            onPress={() => navigation.navigate('Calculator' as never)}
          >
            Calculator
          </Button>
        </View>

        {/* Investment Plans */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Available Plans
          </Text>
          {investmentPlans?.map((plan: any) => (
            <Card key={plan.id} style={styles.planCard}>
              <Card.Content>
                <View style={styles.planHeader}>
                  <View style={styles.planInfo}>
                    <Text variant="titleLarge" style={styles.planName}>
                      {plan.name}
                    </Text>
                    <View style={styles.planBadges}>
                      <Chip style={styles.apyChip} textStyle={styles.chipText}>
                        {plan.apyRate}% APY
                      </Chip>
                      <Chip style={styles.durationChip} textStyle={styles.chipText}>
                        {plan.durationDays} days
                      </Chip>
                    </View>
                  </View>
                  <View style={styles.planIcon}>
                    <Ionicons name="trending-up" size={32} color={colors.primary} />
                  </View>
                </View>

                <Text variant="bodyMedium" style={styles.planDescription}>
                  {plan.description}
                </Text>

                <View style={styles.planDetails}>
                  <View style={styles.detailItem}>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Minimum
                    </Text>
                    <Text variant="bodyMedium" style={styles.detailValue}>
                      ${plan.minimumAmount}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text variant="bodySmall" style={styles.detailLabel}>
                      Maximum
                    </Text>
                    <Text variant="bodyMedium" style={styles.detailValue}>
                      ${plan.maximumAmount}
                    </Text>
                  </View>
                </View>

                <Button
                  mode="contained"
                  onPress={() => handleInvestNow(plan)}
                  style={styles.investButton}
                  icon="plus"
                  disabled={!plan.isActive}
                >
                  {plan.isActive ? 'Invest Now' : 'Not Available'}
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* My Investments */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            My Investments
          </Text>
          {userInvestments && userInvestments.length > 0 ? (
            userInvestments.map((investment: any) => {
              const plan = investmentPlans?.find((p: any) => p.id === investment.planId);
              const progress = calculateProgress(investment);
              
              return (
                <Card key={investment.id} style={styles.investmentCard}>
                  <Card.Content>
                    <View style={styles.investmentHeader}>
                      <View>
                        <Text variant="titleMedium" style={styles.investmentTitle}>
                          {plan?.name || 'Investment Plan'}
                        </Text>
                        <Text variant="bodySmall" style={styles.investmentDate}>
                          Started: {new Date(investment.startDate).toLocaleDateString()}
                        </Text>
                      </View>
                      <Chip
                        style={[
                          styles.statusChip,
                          { backgroundColor: getStatusColor(investment.status) }
                        ]}
                        textStyle={styles.statusText}
                      >
                        {investment.status.toUpperCase()}
                      </Chip>
                    </View>

                    <View style={styles.investmentStats}>
                      <View style={styles.statItem}>
                        <Text variant="bodySmall" style={styles.statLabel}>
                          Invested
                        </Text>
                        <Text variant="titleMedium" style={styles.statValue}>
                          ${investment.amount}
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text variant="bodySmall" style={styles.statLabel}>
                          Returns
                        </Text>
                        <Text variant="titleMedium" style={[styles.statValue, { color: colors.secondary }]}>
                          ${investment.currentReturns}
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text variant="bodySmall" style={styles.statLabel}>
                          Progress
                        </Text>
                        <Text variant="titleMedium" style={styles.statValue}>
                          {Math.round(progress * 100)}%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${progress * 100}%` }
                          ]}
                        />
                      </View>
                      <Text variant="bodySmall" style={styles.progressText}>
                        Ends: {new Date(investment.endDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              );
            })
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Ionicons name="trending-up-outline" size={48} color={colors.textSecondary} />
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  No Investments Yet
                </Text>
                <Text variant="bodyMedium" style={styles.emptyDescription}>
                  Start building your portfolio by investing in one of our plans
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    const firstPlan = investmentPlans?.[0];
                    if (firstPlan) handleInvestNow(firstPlan);
                  }}
                  style={styles.emptyButton}
                >
                  Get Started
                </Button>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>

      {/* Investment Modal */}
      <Portal>
        <Modal
          visible={showInvestModal}
          onDismiss={() => setShowInvestModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Card style={styles.modalCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.modalTitle}>
                Invest in {selectedPlan?.name}
              </Text>
              
              <View style={styles.modalPlanInfo}>
                <Text variant="bodyMedium" style={styles.modalDescription}>
                  {selectedPlan?.description}
                </Text>
                <View style={styles.modalBadges}>
                  <Chip style={styles.modalChip}>
                    {selectedPlan?.apyRate}% APY
                  </Chip>
                  <Chip style={styles.modalChip}>
                    {selectedPlan?.durationDays} days
                  </Chip>
                </View>
              </View>

              <TextInput
                mode="outlined"
                label="Investment Amount"
                value={investmentAmount}
                onChangeText={setInvestmentAmount}
                keyboardType="numeric"
                style={styles.modalInput}
                placeholder={`Min: $${selectedPlan?.minimumAmount} - Max: $${selectedPlan?.maximumAmount}`}
              />

              <View style={styles.modalButtons}>
                <Button
                  mode="outlined"
                  onPress={() => setShowInvestModal(false)}
                  style={styles.modalButton}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleInvestment}
                  loading={investMutation.isPending}
                  disabled={!investmentAmount || investMutation.isPending}
                  style={styles.modalButton}
                >
                  Invest Now
                </Button>
              </View>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Calculator' as never)}
        label="Calculate"
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  planCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  planBadges: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  apyChip: {
    backgroundColor: colors.primary,
  },
  durationChip: {
    backgroundColor: colors.secondary,
  },
  chipText: {
    color: colors.background,
    fontSize: 12,
  },
  planIcon: {
    marginLeft: spacing.md,
  },
  planDescription: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  investButton: {
    borderRadius: borderRadius.medium,
  },
  investmentCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  investmentTitle: {
    color: colors.text,
    fontWeight: 'bold',
  },
  investmentDate: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statusChip: {
    borderRadius: borderRadius.small,
  },
  statusText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  investmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginVertical: spacing.md,
  },
  emptyDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyButton: {
    borderRadius: borderRadius.medium,
  },
  modalContainer: {
    backgroundColor: colors.modalBackground,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
  },
  modalTitle: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  modalPlanInfo: {
    marginBottom: spacing.lg,
  },
  modalDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  modalBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  modalChip: {
    backgroundColor: colors.primary,
  },
  modalInput: {
    marginBottom: spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    borderRadius: borderRadius.medium,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
  },
});

export default InvestmentsScreen;
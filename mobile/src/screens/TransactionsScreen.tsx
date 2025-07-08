import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Chip, FAB, Searchbar, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/api';
import { colors, spacing, borderRadius } from '../theme/theme';

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const { data: transactions, isLoading, refetch } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => user ? ApiService.getUserTransactions(user.id) : null,
    enabled: !!user,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filterOptions = [
    { key: 'all', label: 'All Transactions' },
    { key: 'deposit', label: 'Deposits' },
    { key: 'withdrawal', label: 'Withdrawals' },
    { key: 'investment', label: 'Investments' },
    { key: 'returns', label: 'Returns' },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'arrow-down';
      case 'withdrawal':
        return 'arrow-up';
      case 'investment':
        return 'trending-up';
      case 'returns':
        return 'cash';
      default:
        return 'swap-horizontal';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return colors.secondary;
      case 'withdrawal':
        return colors.error;
      case 'investment':
        return colors.primary;
      case 'returns':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusColor = (amount: string) => {
    return amount.startsWith('-') ? colors.error : colors.secondary;
  };

  const filteredTransactions = transactions?.filter((transaction: any) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    return matchesSearch && matchesFilter;
  }) || [];

  const groupedTransactions = filteredTransactions.reduce((groups: any, transaction: any) => {
    const date = new Date(transaction.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

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
            Transactions
          </Text>
          <Menu
            visible={filterMenuVisible}
            onDismiss={() => setFilterMenuVisible(false)}
            anchor={
              <Button
                mode="text"
                icon="filter"
                onPress={() => setFilterMenuVisible(true)}
              >
                Filter
              </Button>
            }
          >
            {filterOptions.map((option) => (
              <Menu.Item
                key={option.key}
                onPress={() => {
                  setSelectedFilter(option.key);
                  setFilterMenuVisible(false);
                }}
                title={option.label}
              />
            ))}
          </Menu>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search transactions..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>

        {/* Filter Chips */}
        <View style={styles.filterChips}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions.map((option) => (
              <Chip
                key={option.key}
                selected={selectedFilter === option.key}
                onPress={() => setSelectedFilter(option.key)}
                style={[
                  styles.filterChip,
                  selectedFilter === option.key && styles.selectedChip
                ]}
                textStyle={[
                  styles.chipText,
                  selectedFilter === option.key && styles.selectedChipText
                ]}
              >
                {option.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* Transaction Groups */}
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.keys(groupedTransactions)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((date) => (
              <View key={date} style={styles.transactionGroup}>
                <Text variant="titleMedium" style={styles.dateHeader}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                
                {groupedTransactions[date].map((transaction: any) => (
                  <Card key={transaction.id} style={styles.transactionCard}>
                    <Card.Content style={styles.transactionContent}>
                      <View style={styles.transactionIcon}>
                        <Ionicons
                          name={getTransactionIcon(transaction.type)}
                          size={24}
                          color={getTransactionColor(transaction.type)}
                        />
                      </View>
                      
                      <View style={styles.transactionDetails}>
                        <Text variant="bodyLarge" style={styles.transactionDescription}>
                          {transaction.description}
                        </Text>
                        <View style={styles.transactionMeta}>
                          <Chip
                            style={[
                              styles.typeChip,
                              { backgroundColor: getTransactionColor(transaction.type) }
                            ]}
                            textStyle={styles.typeChipText}
                          >
                            {transaction.type.toUpperCase()}
                          </Chip>
                          <Text variant="bodySmall" style={styles.transactionTime}>
                            {new Date(transaction.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={styles.transactionAmount}>
                        <Text
                          variant="titleMedium"
                          style={[
                            styles.amountText,
                            { color: getStatusColor(transaction.amount) }
                          ]}
                        >
                          {transaction.amount.startsWith('-') ? '' : '+'}${transaction.amount}
                        </Text>
                      </View>
                    </Card.Content>
                  </Card>
                ))}
              </View>
            ))
        ) : (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <Ionicons name="receipt-outline" size={48} color={colors.textSecondary} />
              <Text variant="titleMedium" style={styles.emptyTitle}>
                No Transactions Found
              </Text>
              <Text variant="bodyMedium" style={styles.emptyDescription}>
                {searchQuery || selectedFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Your transactions will appear here once you start investing'}
              </Text>
              {!searchQuery && selectedFilter === 'all' && (
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Investments' as never)}
                  style={styles.emptyButton}
                >
                  Start Investing
                </Button>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Transaction Summary */}
        {filteredTransactions.length > 0 && (
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.summaryTitle}>
                Transaction Summary
              </Text>
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text variant="bodySmall" style={styles.summaryLabel}>
                    Total Transactions
                  </Text>
                  <Text variant="titleMedium" style={styles.summaryValue}>
                    {filteredTransactions.length}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text variant="bodySmall" style={styles.summaryLabel}>
                    Total Amount
                  </Text>
                  <Text variant="titleMedium" style={styles.summaryValue}>
                    ${filteredTransactions
                      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0)
                      .toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text variant="bodySmall" style={styles.summaryLabel}>
                    This Month
                  </Text>
                  <Text variant="titleMedium" style={styles.summaryValue}>
                    {filteredTransactions.filter(t => 
                      new Date(t.createdAt).getMonth() === new Date().getMonth()
                    ).length}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
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
  title: {
    color: colors.text,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    backgroundColor: colors.surface,
  },
  filterChips: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  filterChip: {
    marginRight: spacing.xs,
    backgroundColor: colors.surface,
  },
  selectedChip: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.text,
  },
  selectedChipText: {
    color: colors.background,
  },
  transactionGroup: {
    marginBottom: spacing.lg,
  },
  dateHeader: {
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  transactionCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xs,
    backgroundColor: colors.surface,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeChip: {
    height: 24,
    marginRight: spacing.xs,
  },
  typeChipText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  transactionTime: {
    color: colors.textSecondary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontWeight: 'bold',
  },
  emptyCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
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
  summaryCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  summaryTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
  },
});

export default TransactionsScreen;
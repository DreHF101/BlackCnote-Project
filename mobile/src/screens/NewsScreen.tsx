import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, Button, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme/theme';

const NewsScreen = () => {
  const navigation = useNavigation();

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: 'BlackCnote Reaches New Investment Milestone',
      excerpt: 'Our platform has successfully processed over $10 million in investments, marking a significant achievement in our growth journey.',
      category: 'Company News',
      date: '2024-01-15',
      readTime: '3 min read',
      image: null,
    },
    {
      id: 2,
      title: 'New Investment Plans Now Available',
      excerpt: 'We are excited to announce three new investment plans with enhanced returns and flexible terms for our valued investors.',
      category: 'Product Update',
      date: '2024-01-12',
      readTime: '5 min read',
      image: null,
    },
    {
      id: 3,
      title: 'Market Analysis: Q4 2023 Performance',
      excerpt: 'Our comprehensive analysis of market trends and investment performance for the fourth quarter of 2023.',
      category: 'Market Analysis',
      date: '2024-01-10',
      readTime: '8 min read',
      image: null,
    },
    {
      id: 4,
      title: 'Security Enhancement: Two-Factor Authentication',
      excerpt: 'Enhanced security measures including two-factor authentication are now available to all users.',
      category: 'Security',
      date: '2024-01-08',
      readTime: '4 min read',
      image: null,
    },
    {
      id: 5,
      title: 'Investment Tips: Diversification Strategies',
      excerpt: 'Learn how to effectively diversify your investment portfolio to maximize returns while minimizing risk.',
      category: 'Investment Tips',
      date: '2024-01-05',
      readTime: '6 min read',
      image: null,
    },
  ];

  const categories = [
    'All',
    'Company News',
    'Product Update',
    'Market Analysis',
    'Security',
    'Investment Tips',
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Company News':
        return colors.primary;
      case 'Product Update':
        return colors.secondary;
      case 'Market Analysis':
        return colors.accent;
      case 'Security':
        return colors.error;
      case 'Investment Tips':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            News & Updates
          </Text>
          <Button
            mode="text"
            icon="rss"
            onPress={() => {}}
          >
            Subscribe
          </Button>
        </View>

        {/* Featured Article */}
        <Card style={styles.featuredCard}>
          <Card.Content>
            <View style={styles.featuredBadge}>
              <Chip style={styles.featuredChip} textStyle={styles.featuredChipText}>
                Featured
              </Chip>
            </View>
            <Text variant="headlineSmall" style={styles.featuredTitle}>
              {newsArticles[0].title}
            </Text>
            <Text variant="bodyMedium" style={styles.featuredExcerpt}>
              {newsArticles[0].excerpt}
            </Text>
            <View style={styles.featuredMeta}>
              <Chip
                style={[
                  styles.categoryChip,
                  { backgroundColor: getCategoryColor(newsArticles[0].category) }
                ]}
                textStyle={styles.categoryChipText}
              >
                {newsArticles[0].category}
              </Chip>
              <Text variant="bodySmall" style={styles.metaText}>
                {newsArticles[0].date} • {newsArticles[0].readTime}
              </Text>
            </View>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.readMoreButton}
            >
              Read More
            </Button>
          </Card.Content>
        </Card>

        {/* Category Filter */}
        <View style={styles.categoriesContainer}>
          <Text variant="titleMedium" style={styles.categoriesTitle}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <Chip
                key={category}
                onPress={() => {}}
                style={[
                  styles.categoryFilterChip,
                  category === 'All' && styles.activeCategoryChip
                ]}
                textStyle={[
                  styles.categoryFilterText,
                  category === 'All' && styles.activeCategoryText
                ]}
              >
                {category}
              </Chip>
            ))}
          </ScrollView>
        </View>

        {/* News Articles */}
        <View style={styles.articlesContainer}>
          <Text variant="titleMedium" style={styles.articlesTitle}>
            Latest Articles
          </Text>
          {newsArticles.slice(1).map((article) => (
            <Card key={article.id} style={styles.articleCard}>
              <Card.Content style={styles.articleContent}>
                <View style={styles.articleHeader}>
                  <Chip
                    style={[
                      styles.categoryChip,
                      { backgroundColor: getCategoryColor(article.category) }
                    ]}
                    textStyle={styles.categoryChipText}
                  >
                    {article.category}
                  </Chip>
                  <Text variant="bodySmall" style={styles.articleDate}>
                    {article.date}
                  </Text>
                </View>
                <Text variant="titleMedium" style={styles.articleTitle}>
                  {article.title}
                </Text>
                <Text variant="bodyMedium" style={styles.articleExcerpt}>
                  {article.excerpt}
                </Text>
                <View style={styles.articleFooter}>
                  <Text variant="bodySmall" style={styles.readTime}>
                    {article.readTime}
                  </Text>
                  <Button
                    mode="text"
                    onPress={() => {}}
                    style={styles.readButton}
                  >
                    Read
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Newsletter Signup */}
        <Card style={styles.newsletterCard}>
          <Card.Content style={styles.newsletterContent}>
            <View style={styles.newsletterIcon}>
              <Ionicons name="mail" size={32} color={colors.primary} />
            </View>
            <Text variant="titleLarge" style={styles.newsletterTitle}>
              Stay Updated
            </Text>
            <Text variant="bodyMedium" style={styles.newsletterDescription}>
              Subscribe to our newsletter to receive the latest news and investment insights directly in your inbox.
            </Text>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.subscribeButton}
              icon="email"
            >
              Subscribe to Newsletter
            </Button>
          </Card.Content>
        </Card>

        {/* Market Updates */}
        <Card style={styles.marketCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.marketTitle}>
              Market Updates
            </Text>
            <View style={styles.marketStats}>
              <View style={styles.marketStat}>
                <Ionicons name="trending-up" size={24} color={colors.secondary} />
                <Text variant="bodySmall" style={styles.marketLabel}>
                  Market Cap
                </Text>
                <Text variant="titleMedium" style={styles.marketValue}>
                  $12.5M
                </Text>
              </View>
              <View style={styles.marketStat}>
                <Ionicons name="people" size={24} color={colors.primary} />
                <Text variant="bodySmall" style={styles.marketLabel}>
                  Active Investors
                </Text>
                <Text variant="titleMedium" style={styles.marketValue}>
                  2,450
                </Text>
              </View>
              <View style={styles.marketStat}>
                <Ionicons name="bar-chart" size={24} color={colors.accent} />
                <Text variant="bodySmall" style={styles.marketLabel}>
                  Monthly Growth
                </Text>
                <Text variant="titleMedium" style={styles.marketValue}>
                  +15.2%
                </Text>
              </View>
            </View>
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
  featuredCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  featuredBadge: {
    marginBottom: spacing.md,
  },
  featuredChip: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
  },
  featuredChipText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  featuredExcerpt: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  categoryChip: {
    height: 28,
  },
  categoryChipText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  metaText: {
    color: colors.textSecondary,
  },
  readMoreButton: {
    borderRadius: borderRadius.medium,
  },
  categoriesContainer: {
    marginBottom: spacing.lg,
  },
  categoriesTitle: {
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  categoryFilterChip: {
    marginHorizontal: spacing.xs,
    marginLeft: spacing.lg,
    backgroundColor: colors.surface,
  },
  activeCategoryChip: {
    backgroundColor: colors.primary,
  },
  categoryFilterText: {
    color: colors.text,
  },
  activeCategoryText: {
    color: colors.background,
  },
  articlesContainer: {
    marginBottom: spacing.lg,
  },
  articlesTitle: {
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  articleCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
  },
  articleContent: {
    padding: spacing.md,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  articleDate: {
    color: colors.textSecondary,
  },
  articleTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  articleExcerpt: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readTime: {
    color: colors.textSecondary,
  },
  readButton: {
    margin: 0,
  },
  newsletterCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  newsletterContent: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  newsletterIcon: {
    marginBottom: spacing.md,
  },
  newsletterTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  newsletterDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  subscribeButton: {
    borderRadius: borderRadius.medium,
  },
  marketCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  marketTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marketStat: {
    alignItems: 'center',
  },
  marketLabel: {
    color: colors.textSecondary,
    marginVertical: spacing.xs,
  },
  marketValue: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default NewsScreen;
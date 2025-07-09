/**
 * AI Investment Assistant Component
 * Comprehensive AI-powered investment recommendations and portfolio optimization
 */

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  BarChart3,
  PieChart,
  Lightbulb,
  Star,
  Sparkles,
  Trophy,
  Shield,
  ArrowUpRight,
  Calendar,
  DollarSign
} from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface AIRecommendation {
  id: string;
  type: 'portfolio_optimization' | 'new_investment' | 'rebalancing' | 'goal_adjustment';
  title: string;
  description: string;
  actionItems: string[];
  expectedImpact: {
    roi: number;
    risk: 'low' | 'medium' | 'high';
    timeframe: string;
  };
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

interface DynamicAPY {
  baseRate: number;
  performanceBonus: number;
  loyaltyMultiplier: number;
  marketConditionAdjustment: number;
  finalAPY: number;
}

interface InvestmentGoal {
  goalId: number;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  progress: number;
  timeRemaining: number;
  onTrack: boolean;
  recommendations: string[];
}

interface SmartPool {
  id: number;
  poolName: string;
  category: string;
  expectedAPY: number;
  riskLevel: string;
  participantCount: number;
  totalValue: number;
  minimumInvestment: number;
}

export default function AIInvestmentAssistant() {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [selectedRiskTolerance, setSelectedRiskTolerance] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch AI recommendations
  const { data: recommendations, isLoading: recommendationsLoading } = useQuery<AIRecommendation[]>({
    queryKey: ['/api/ai/recommendations', selectedRiskTolerance],
    queryFn: () => apiRequest('GET', `/api/ai/recommendations?riskTolerance=${selectedRiskTolerance}`),
  });

  // Fetch dynamic APY data
  const { data: dynamicAPY, isLoading: apyLoading } = useQuery<DynamicAPY>({
    queryKey: ['/api/ai/dynamic-apy'],
    queryFn: () => apiRequest('GET', '/api/ai/dynamic-apy'),
  });

  // Fetch investment goals
  const { data: investmentGoals, isLoading: goalsLoading } = useQuery<{
    goals: InvestmentGoal[];
    overallProgress: number;
  }>({
    queryKey: ['/api/ai/investment-goals'],
    queryFn: () => apiRequest('GET', '/api/ai/investment-goals'),
  });

  // Fetch smart pools
  const { data: smartPools, isLoading: poolsLoading } = useQuery<SmartPool[]>({
    queryKey: ['/api/ai/smart-pools'],
    queryFn: () => apiRequest('GET', '/api/ai/smart-pools'),
  });

  // Accept recommendation mutation
  const acceptRecommendationMutation = useMutation({
    mutationFn: (recommendationId: string) => 
      apiRequest('POST', `/api/ai/recommendations/${recommendationId}/accept`),
    onSuccess: () => {
      toast({
        title: "Recommendation Applied",
        description: "Your investment strategy has been updated based on AI recommendations.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/ai/recommendations'] });
    },
  });

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'portfolio_optimization': return <PieChart className="h-5 w-5" />;
      case 'new_investment': return <TrendingUp className="h-5 w-5" />;
      case 'rebalancing': return <BarChart3 className="h-5 w-5" />;
      case 'goal_adjustment': return <Target className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  if (recommendationsLoading || apyLoading || goalsLoading || poolsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-500" />
              AI Investment Assistant
            </h2>
            <p className="text-[var(--text-secondary)]">Loading AI-powered investment insights...</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse bg-[var(--dark-card)]">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            AI Investment Assistant
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </h2>
          <p className="text-[var(--text-secondary)]">
            Personalized investment recommendations powered by advanced AI algorithms
          </p>
        </div>
        
        {/* Risk Tolerance Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--text-secondary)]">Risk Tolerance:</span>
          <select
            value={selectedRiskTolerance}
            onChange={(e) => setSelectedRiskTolerance(e.target.value as any)}
            className="px-3 py-1 rounded-md border border-[var(--dark-border)] bg-[var(--dark-card)] text-[var(--text-primary)]"
          >
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </div>
      </div>

      {/* Dynamic APY Display */}
      {dynamicAPY && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Dynamic APY Rate
                </h3>
                <p className="text-[var(--text-secondary)]">Personalized based on your performance and loyalty</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {dynamicAPY.finalAPY.toFixed(2)}%
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Current APY</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-[var(--text-primary)]">
                  {dynamicAPY.baseRate.toFixed(2)}%
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Base Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">
                  +{dynamicAPY.performanceBonus.toFixed(2)}%
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Performance Bonus</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">
                  {dynamicAPY.loyaltyMultiplier.toFixed(2)}x
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Loyalty Multiplier</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-semibold ${dynamicAPY.marketConditionAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {dynamicAPY.marketConditionAdjustment >= 0 ? '+' : ''}{dynamicAPY.marketConditionAdjustment.toFixed(2)}%
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Market Adjustment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="pools" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Smart Pools
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        {/* AI Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {recommendations && recommendations.length > 0 ? (
            <div className="grid gap-4">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="bg-[var(--dark-card)] border-[var(--dark-border)]">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/30">
                          {getRecommendationIcon(rec.type)}
                        </div>
                        <div>
                          <CardTitle className="text-[var(--text-primary)] text-lg">{rec.title}</CardTitle>
                          <p className="text-[var(--text-secondary)] text-sm mt-1">{rec.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {(rec.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Action Items */}
                      <div>
                        <h4 className="font-medium text-[var(--text-primary)] mb-2">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {rec.actionItems.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expected Impact */}
                      <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            +{rec.expectedImpact.roi}%
                          </div>
                          <div className="text-xs text-[var(--text-secondary)]">Expected ROI</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-semibold ${getRiskColor(rec.expectedImpact.risk)}`}>
                            {rec.expectedImpact.risk.toUpperCase()}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)]">Risk Level</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-[var(--text-primary)]">
                            {rec.expectedImpact.timeframe}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)]">Timeframe</div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => acceptRecommendationMutation.mutate(rec.id)}
                        disabled={acceptRecommendationMutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {acceptRecommendationMutation.isPending ? (
                          'Applying...'
                        ) : (
                          <>
                            Apply Recommendation
                            <ArrowUpRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[var(--dark-card)]">
              <CardContent className="text-center py-16">
                <Brain className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-3">
                  No Recommendations Available
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                  Our AI is analyzing your portfolio. Check back soon for personalized recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Investment Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          {investmentGoals && (
            <div className="space-y-6">
              {/* Overall Progress */}
              <Card className="bg-[var(--dark-card)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Overall Goal Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[var(--text-secondary)]">Total Progress</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {investmentGoals.overallProgress.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={investmentGoals.overallProgress} className="h-3" />
                </CardContent>
              </Card>

              {/* Individual Goals */}
              <div className="grid gap-4">
                {investmentGoals.goals.map((goal) => (
                  <Card key={goal.goalId} className="bg-[var(--dark-card)]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-[var(--text-primary)]">{goal.goalName}</h3>
                          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mt-1">
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {goal.timeRemaining} days remaining
                            </span>
                          </div>
                        </div>
                        <Badge className={goal.onTrack ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {goal.onTrack ? 'On Track' : 'Behind'}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-[var(--text-secondary)]">Progress</span>
                            <span className="text-sm font-medium">{goal.progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        {goal.recommendations.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">AI Recommendations:</h4>
                            <ul className="space-y-1">
                              {goal.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                  <Lightbulb className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Smart Pools Tab */}
        <TabsContent value="pools" className="space-y-4">
          {smartPools && smartPools.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {smartPools.map((pool) => (
                <Card key={pool.id} className="bg-[var(--dark-card)]">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-[var(--text-primary)]">{pool.poolName}</CardTitle>
                        <p className="text-[var(--text-secondary)] text-sm capitalize">{pool.category} • {pool.riskLevel} Risk</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {pool.expectedAPY.toFixed(1)}% APY
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[var(--text-secondary)]">Total Value</span>
                          <div className="font-semibold text-[var(--text-primary)]">
                            ${pool.totalValue.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-[var(--text-secondary)]">Participants</span>
                          <div className="font-semibold text-[var(--text-primary)]">
                            {pool.participantCount}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-[var(--text-secondary)]">Minimum Investment: </span>
                        <span className="font-semibold text-[var(--text-primary)]">
                          ${pool.minimumInvestment.toLocaleString()}
                        </span>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Join Smart Pool
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[var(--dark-card)]">
              <CardContent className="text-center py-16">
                <PieChart className="h-16 w-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <h3 className="text-[var(--text-primary)] text-xl font-semibold mb-3">
                  No Smart Pools Available
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Smart investment pools are being prepared. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-[var(--dark-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Portfolio Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">87</div>
                  <div className="text-[var(--text-secondary)]">Excellent</div>
                  <Progress value={87} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[var(--dark-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  AI Confidence Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
                  <div className="text-[var(--text-secondary)]">High Confidence</div>
                  <Progress value={92} className="mt-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
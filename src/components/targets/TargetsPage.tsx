import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Award,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TargetData {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  period: 'daily' | 'weekly' | 'monthly';
  icon: typeof Target;
  trend?: number;
}

const targets: TargetData[] = [
  { id: '1', name: 'Admissions', current: 18, target: 25, unit: 'students', period: 'monthly', icon: Users, trend: 12 },
  { id: '2', name: 'Revenue', current: 288000, target: 400000, unit: 'BDT', period: 'monthly', icon: DollarSign, trend: 8 },
  { id: '3', name: 'Calls Made', current: 145, target: 200, unit: 'calls', period: 'weekly', icon: Target, trend: -5 },
  { id: '4', name: 'Follow-ups', current: 12, target: 15, unit: 'follow-ups', period: 'daily', icon: Calendar, trend: 20 },
  { id: '5', name: 'Hot Leads', current: 24, target: 30, unit: 'leads', period: 'monthly', icon: TrendingUp, trend: 15 },
  { id: '6', name: 'Visit Conversions', current: 8, target: 12, unit: 'visits', period: 'weekly', icon: CheckCircle2, trend: 0 },
];

const achievements = [
  { id: '1', title: 'Top Performer', description: 'Highest conversion rate this month', earned: true, icon: '🏆' },
  { id: '2', title: 'Call Champion', description: 'Made 100+ calls in a week', earned: true, icon: '📞' },
  { id: '3', title: 'Quick Responder', description: 'Average response time under 15 min', earned: false, icon: '⚡' },
  { id: '4', title: 'Revenue King', description: 'Generated 500K+ in admissions', earned: false, icon: '💰' },
];

export function TargetsPage() {
  const getProgressColor = (percentage: number): 'default' | 'success' | 'warning' => {
    if (percentage >= 100) return 'success';
    if (percentage >= 70) return 'default';
    return 'warning';
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'BDT') {
      return `৳${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  const getPeriodBadge = (period: string) => {
    const colors: Record<string, string> = {
      daily: 'bg-blue-500/10 text-blue-500',
      weekly: 'bg-purple-500/10 text-purple-500',
      monthly: 'bg-orange-500/10 text-orange-500',
    };
    return colors[period] || '';
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="shadow-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Monthly Target Progress</h2>
              <p className="text-sm text-muted-foreground">December 2024</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">72%</p>
              <p className="text-sm text-muted-foreground">Overall</p>
            </div>
          </div>
          <Progress value={72} variant="success" className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            7 days remaining to reach your targets
          </p>
        </CardContent>
      </Card>

      {/* Individual Targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {targets.map((target) => {
          const percentage = Math.round((target.current / target.target) * 100);
          const Icon = target.icon;
          
          return (
            <Card key={target.id} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{target.name}</h3>
                      <Badge className={cn("text-xs", getPeriodBadge(target.period))}>
                        {target.period}
                      </Badge>
                    </div>
                  </div>
                  {target.trend !== undefined && target.trend !== 0 && (
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      target.trend > 0 ? "text-success" : "text-destructive"
                    )}>
                      <TrendingUp className={cn("w-3 h-3", target.trend < 0 && "rotate-180")} />
                      {Math.abs(target.trend)}%
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatValue(target.current, target.unit)} / {formatValue(target.target, target.unit)}
                    </span>
                    <span className={cn(
                      "font-medium",
                      percentage >= 100 ? "text-success" : 
                      percentage >= 70 ? "text-foreground" : "text-warning"
                    )}>
                      {percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    variant={getProgressColor(percentage)}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "p-4 rounded-xl border text-center transition-all",
                  achievement.earned 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-muted/30 border-border opacity-60"
                )}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className={cn(
                  "font-medium mb-1",
                  achievement.earned ? "text-foreground" : "text-muted-foreground"
                )}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <Badge variant="success" className="mt-2 text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

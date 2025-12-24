import { cn } from '@/lib/utils';
import { 
  Users, 
  UserPlus, 
  Flame, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  GraduationCap,
  Banknote,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardStats as DashboardStatsType } from '@/types/crm';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: 'default' | 'hot' | 'success' | 'warning' | 'info';
  prefix?: string;
  suffix?: string;
}

function StatCard({ title, value, change, icon, color = 'default', prefix, suffix }: StatCardProps) {
  const colorClasses = {
    default: 'bg-primary/10 text-primary',
    hot: 'bg-score-hot/10 text-score-hot',
    success: 'bg-score-qualified/10 text-score-qualified',
    warning: 'bg-score-warm/10 text-score-warm',
    info: 'bg-score-cold/10 text-score-cold',
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-baseline gap-1">
              {prefix && <span className="text-lg text-muted-foreground">{prefix}</span>}
              <span className="text-2xl font-bold text-foreground">{value}</span>
              {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
            </div>
            {change !== undefined && (
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                change >= 0 ? "text-score-qualified" : "text-destructive"
              )}>
                {change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{Math.abs(change)}% from last week</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center",
            colorClasses[color]
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Leads"
        value={stats.totalLeads}
        change={12}
        icon={<Users className="h-5 w-5" />}
        color="default"
      />
      <StatCard
        title="New Leads Today"
        value={stats.newLeadsToday}
        change={8}
        icon={<UserPlus className="h-5 w-5" />}
        color="info"
      />
      <StatCard
        title="Hot Leads"
        value={stats.hotLeads}
        change={-3}
        icon={<Flame className="h-5 w-5" />}
        color="hot"
      />
      <StatCard
        title="Conversion Rate"
        value={stats.conversionRate}
        suffix="%"
        change={5}
        icon={<TrendingUp className="h-5 w-5" />}
        color="success"
      />
      <StatCard
        title="Follow-ups Today"
        value={stats.followUpsToday}
        icon={<Calendar className="h-5 w-5" />}
        color="warning"
      />
      <StatCard
        title="Overdue Follow-ups"
        value={stats.overdueFollowUps}
        icon={<AlertCircle className="h-5 w-5" />}
        color="hot"
      />
      <StatCard
        title="Admissions (This Month)"
        value={stats.admissionsThisMonth}
        change={22}
        icon={<GraduationCap className="h-5 w-5" />}
        color="success"
      />
      <StatCard
        title="Revenue (This Month)"
        value={formatCurrency(stats.revenueThisMonth)}
        prefix="৳"
        change={18}
        icon={<Banknote className="h-5 w-5" />}
        color="success"
      />
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { agentPerformance } from '@/data/mockData';
import { TrendingUp, Activity } from 'lucide-react';

export function AgentPerformanceCard() {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 35) return 'bg-score-qualified';
    if (rate >= 25) return 'bg-score-warm';
    return 'bg-score-cold';
  };

  // Sort by conversion rate
  const sortedAgents = [...agentPerformance].sort((a, b) => b.conversionRate - a.conversionRate);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          Agent Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAgents.map((agent, index) => (
            <div key={agent.agentId} className="animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {getInitials(agent.agentName)}
                    </AvatarFallback>
                  </Avatar>
                  {index === 0 && (
                    <span className="absolute -top-1 -right-1 text-sm">🏆</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">
                      {agent.agentName}
                    </span>
                    <span className={cn(
                      "text-sm font-bold",
                      agent.conversionRate >= 35 ? "text-score-qualified" : 
                      agent.conversionRate >= 25 ? "text-score-warm" : "text-foreground"
                    )}>
                      {agent.conversionRate}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress 
                      value={agent.conversionRate} 
                      className="h-1.5 flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{agent.conversions}/{agent.totalLeads} leads</span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {agent.activitiesToday} today
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { cn } from '@/lib/utils';
import { Activity } from '@/types/crm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageSquare, MapPin, FileText, Mail, Clock } from 'lucide-react';
import { mockActivities, mockLeads, agents } from '@/data/mockData';

export function RecentActivities() {
  const getActivityIcon = (type: string) => {
    const iconClasses = "h-4 w-4";
    switch (type) {
      case 'call':
        return <Phone className={cn(iconClasses, "text-stage-new")} />;
      case 'whatsapp':
        return <MessageSquare className={cn(iconClasses, "text-score-qualified")} />;
      case 'visit':
        return <MapPin className={cn(iconClasses, "text-stage-visit")} />;
      case 'note':
        return <FileText className={cn(iconClasses, "text-muted-foreground")} />;
      case 'email':
        return <Mail className={cn(iconClasses, "text-stage-contacted")} />;
      default:
        return <Clock className={cn(iconClasses, "text-muted-foreground")} />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));

    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(date);
  };

  const getLeadName = (leadId: string) => {
    return mockLeads.find(l => l.id === leadId)?.name || 'Unknown';
  };

  const getAgentName = (agentId: string) => {
    return agents.find(a => a.id === agentId)?.name || 'Unknown';
  };

  // Sort by most recent
  const sortedActivities = [...mockActivities].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  ).slice(0, 8);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 animate-slide-in">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {activity.type}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(activity.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {getLeadName(activity.leadId)}
                </p>
                <p className="text-xs text-muted-foreground/70 truncate">
                  by {getAgentName(activity.createdBy)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

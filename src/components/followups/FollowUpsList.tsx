import { Lead } from '@/types/crm';
import { agents } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isTomorrow, isPast, addDays } from 'date-fns';

interface FollowUpsListProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function FollowUpsList({ leads, onLeadClick }: FollowUpsListProps) {
  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'Unassigned';
  };

  const leadsWithFollowUps = leads.filter(lead => lead.nextFollowUp);

  const overdueLeads = leadsWithFollowUps.filter(
    lead => lead.nextFollowUp && isPast(new Date(lead.nextFollowUp)) && !isToday(new Date(lead.nextFollowUp!))
  );
  
  const todayLeads = leadsWithFollowUps.filter(
    lead => lead.nextFollowUp && isToday(new Date(lead.nextFollowUp))
  );
  
  const tomorrowLeads = leadsWithFollowUps.filter(
    lead => lead.nextFollowUp && isTomorrow(new Date(lead.nextFollowUp))
  );
  
  const upcomingLeads = leadsWithFollowUps.filter(
    lead => lead.nextFollowUp && 
      new Date(lead.nextFollowUp) > addDays(new Date(), 1) &&
      new Date(lead.nextFollowUp) <= addDays(new Date(), 7)
  );

  const FollowUpCard = ({ lead, isOverdue = false }: { lead: Lead; isOverdue?: boolean }) => (
    <div 
      className={cn(
        "p-4 rounded-lg border transition-all cursor-pointer hover:shadow-card",
        isOverdue 
          ? "bg-destructive/5 border-destructive/20 hover:border-destructive/40" 
          : "bg-card border-border hover:border-primary/30"
      )}
      onClick={() => onLeadClick(lead)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-foreground">{lead.name}</h4>
          <p className="text-sm text-muted-foreground">{lead.phone}</p>
        </div>
        <Badge variant={lead.score as 'hot' | 'warm' | 'cold'} className="text-xs">
          {lead.score.toUpperCase()}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Calendar className="w-4 h-4" />
        <span>
          {lead.nextFollowUp && format(new Date(lead.nextFollowUp), 'MMM d, h:mm a')}
        </span>
      </div>

      {lead.course && (
        <p className="text-sm text-muted-foreground mb-3">
          Course: <span className="text-foreground">{lead.course}</span>
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {getAgentName(lead.assignedTo)}
        </span>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="h-8"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`tel:${lead.phone}`);
            }}
          >
            <Phone className="w-3.5 h-3.5 mr-1" />
            Call
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="h-8"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`);
            }}
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );

  const Section = ({ 
    title, 
    leads, 
    icon: Icon, 
    iconColor = 'text-primary',
    isOverdue = false 
  }: { 
    title: string; 
    leads: Lead[]; 
    icon: typeof Clock;
    iconColor?: string;
    isOverdue?: boolean;
  }) => (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className={cn("w-5 h-5", iconColor)} />
          {title}
          <Badge variant="secondary" className="ml-auto">
            {leads.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length > 0 ? (
          <div className="space-y-3">
            {leads.map(lead => (
              <FollowUpCard key={lead.id} lead={lead} isOverdue={isOverdue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No follow-ups</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Section 
        title="Overdue" 
        leads={overdueLeads} 
        icon={AlertTriangle}
        iconColor="text-destructive"
        isOverdue
      />
      <Section 
        title="Today" 
        leads={todayLeads} 
        icon={Clock}
        iconColor="text-orange-500"
      />
      <Section 
        title="Tomorrow" 
        leads={tomorrowLeads} 
        icon={Calendar}
        iconColor="text-blue-500"
      />
      <Section 
        title="This Week" 
        leads={upcomingLeads} 
        icon={Calendar}
        iconColor="text-muted-foreground"
      />
    </div>
  );
}

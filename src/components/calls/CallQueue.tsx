import { Lead } from '@/types/crm';
import { agents } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Phone, 
  PhoneCall,
  PhoneOff,
  Clock, 
  User,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, differenceInHours } from 'date-fns';

interface CallQueueProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function CallQueue({ leads, onLeadClick }: CallQueueProps) {
  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'Unassigned';
  };

  // Filter leads that need calls (new prospects or haven't been contacted recently)
  const needsCall = leads.filter(lead => {
    const hoursSinceContact = lead.lastContactedAt 
      ? differenceInHours(new Date(), new Date(lead.lastContactedAt))
      : 999;
    
    return (
      lead.stage === 'new_prospect' ||
      (lead.stage !== 'admission' && lead.stage !== 'not_qualified' && hoursSinceContact > 24)
    );
  });

  // Sort by priority: hot leads first, then by last contact time
  const sortedLeads = [...needsCall].sort((a, b) => {
    const scoreOrder = { hot: 0, warm: 1, cold: 2 };
    const scoreDiff = scoreOrder[a.score] - scoreOrder[b.score];
    if (scoreDiff !== 0) return scoreDiff;
    
    const aTime = a.lastContactedAt ? new Date(a.lastContactedAt).getTime() : 0;
    const bTime = b.lastContactedAt ? new Date(b.lastContactedAt).getTime() : 0;
    return aTime - bTime;
  });

  const hotLeads = sortedLeads.filter(l => l.score === 'hot');
  const warmLeads = sortedLeads.filter(l => l.score === 'warm');
  const coldLeads = sortedLeads.filter(l => l.score === 'cold');

  // Stats
  const totalCalls = sortedLeads.length;
  const completedToday = 5; // Mock data
  const targetCalls = 20;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCalls}</p>
                <p className="text-sm text-muted-foreground">Calls Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedToday}</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Daily Target</span>
                <span className="font-medium">{completedToday}/{targetCalls}</span>
              </div>
              <Progress 
                value={(completedToday / targetCalls) * 100} 
                variant="success"
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Queue */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-primary" />
            Call Queue
            <Badge variant="secondary" className="ml-2">{sortedLeads.length} leads</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Priority Sections */}
            {hotLeads.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-hot" />
                  <span className="text-sm font-medium text-hot">Hot Leads - Call First!</span>
                </div>
                <div className="space-y-2">
                  {hotLeads.map(lead => (
                    <CallItem key={lead.id} lead={lead} onLeadClick={onLeadClick} getAgentName={getAgentName} />
                  ))}
                </div>
              </div>
            )}

            {warmLeads.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-warm" />
                  <span className="text-sm font-medium text-warm">Warm Leads</span>
                </div>
                <div className="space-y-2">
                  {warmLeads.map(lead => (
                    <CallItem key={lead.id} lead={lead} onLeadClick={onLeadClick} getAgentName={getAgentName} />
                  ))}
                </div>
              </div>
            )}

            {coldLeads.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full bg-cold" />
                  <span className="text-sm font-medium text-cold">Cold Leads</span>
                </div>
                <div className="space-y-2">
                  {coldLeads.map(lead => (
                    <CallItem key={lead.id} lead={lead} onLeadClick={onLeadClick} getAgentName={getAgentName} />
                  ))}
                </div>
              </div>
            )}

            {sortedLeads.length === 0 && (
              <div className="text-center py-12">
                <PhoneOff className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No pending calls</p>
                <p className="text-sm text-muted-foreground/70">All leads have been contacted recently</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CallItem({ 
  lead, 
  onLeadClick, 
  getAgentName 
}: { 
  lead: Lead; 
  onLeadClick: (lead: Lead) => void;
  getAgentName: (id: string) => string;
}) {
  const hoursSinceContact = lead.lastContactedAt 
    ? differenceInHours(new Date(), new Date(lead.lastContactedAt))
    : null;

  return (
    <div 
      className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:shadow-card hover:border-primary/30 transition-all cursor-pointer"
      onClick={() => onLeadClick(lead)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground truncate">{lead.name}</p>
          <Badge variant="outline" className="text-xs shrink-0">
            {lead.stage.replace('_', ' ')}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
          <span>{lead.phone}</span>
          {lead.course && (
            <>
              <span>•</span>
              <span>{lead.course}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {hoursSinceContact !== null && (
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {hoursSinceContact}h ago
            </div>
            <p className="text-xs text-muted-foreground">{getAgentName(lead.assignedTo)}</p>
          </div>
        )}
        
        <Button 
          size="sm"
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${lead.phone}`);
          }}
        >
          <Phone className="w-4 h-4" />
          Call Now
        </Button>
      </div>
    </div>
  );
}

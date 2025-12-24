import { cn } from '@/lib/utils';
import { Lead, PipelineStageConfig } from '@/types/crm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Calendar, Flame, Thermometer, Snowflake } from 'lucide-react';
import { pipelineStages, agents } from '@/data/mockData';

interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
}

function LeadCard({ lead, onClick }: LeadCardProps) {
  const agent = agents.find(a => a.id === lead.assignedTo);
  
  const getScoreIcon = () => {
    switch (lead.score) {
      case 'hot':
        return <Flame className="h-3.5 w-3.5" />;
      case 'warm':
        return <Thermometer className="h-3.5 w-3.5" />;
      case 'cold':
        return <Snowflake className="h-3.5 w-3.5" />;
    }
  };

  const getScoreColor = () => {
    switch (lead.score) {
      case 'hot':
        return 'bg-score-hot/10 text-score-hot border-score-hot/20';
      case 'warm':
        return 'bg-score-warm/10 text-score-warm border-score-warm/20';
      case 'cold':
        return 'bg-score-cold/10 text-score-cold border-score-cold/20';
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div
      onClick={() => onClick?.(lead)}
      className={cn(
        "p-3 bg-card rounded-lg border border-border cursor-pointer",
        "hover:shadow-card-hover hover:border-primary/20 transition-all duration-200",
        "animate-scale-in"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-foreground text-sm truncate flex-1">{lead.name}</h4>
        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0.5 gap-1", getScoreColor())}>
          {getScoreIcon()}
          {lead.scoreValue}
        </Badge>
      </div>

      {lead.course && (
        <p className="text-xs text-muted-foreground mb-2 truncate">{lead.course}</p>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Phone className="h-3 w-3" />
        <span>{lead.phone}</span>
      </div>

      {lead.nextFollowUp && (
        <div className="flex items-center gap-2 text-xs text-score-warm mb-2">
          <Calendar className="h-3 w-3" />
          <span>Follow-up: {formatDate(lead.nextFollowUp)}</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[8px] bg-muted">
              {agent ? getInitials(agent.name) : '?'}
            </AvatarFallback>
          </Avatar>
          <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
            {agent?.name || 'Unassigned'}
          </span>
        </div>
        {lead.tags && lead.tags.length > 0 && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {lead.tags[0]}
          </Badge>
        )}
      </div>
    </div>
  );
}

interface PipelineColumnProps {
  stage: PipelineStageConfig;
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
}

function PipelineColumn({ stage, leads, onLeadClick }: PipelineColumnProps) {
  const stageColorMap: Record<string, string> = {
    'stage-new': 'bg-stage-new',
    'stage-contacted': 'bg-stage-contacted',
    'stage-interested': 'bg-stage-interested',
    'stage-visit': 'bg-stage-visit',
    'stage-payment': 'bg-stage-payment',
    'stage-admission': 'bg-stage-admission',
    'stage-not-qualified': 'bg-stage-not-qualified',
  };

  return (
    <div className="flex-shrink-0 w-72">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-2.5 h-2.5 rounded-full", stageColorMap[stage.color])} />
          <h3 className="font-semibold text-sm text-foreground">{stage.label}</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {leads.length}
        </Badge>
      </div>
      <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onClick={onLeadClick} />
        ))}
        {leads.length === 0 && (
          <div className="py-8 text-center text-muted-foreground text-sm border border-dashed border-border rounded-lg">
            No leads
          </div>
        )}
      </div>
    </div>
  );
}

interface PipelineBoardProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
}

export function PipelineBoard({ leads, onLeadClick }: PipelineBoardProps) {
  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage) => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              leads={getLeadsByStage(stage.id)}
              onLeadClick={onLeadClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

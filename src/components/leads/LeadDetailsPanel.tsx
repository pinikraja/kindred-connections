import { cn } from '@/lib/utils';
import { Activity, Lead } from '@/types/crm';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, 
  Mail, 
  Calendar, 
  Flame, 
  Thermometer, 
  Snowflake,
  MessageSquare,
  MapPin,
  Clock,
  FileText,
  Send,
  DollarSign,
  User,
  Briefcase,
  X
} from 'lucide-react';
import { agents, mockActivities, pipelineStages } from '@/data/mockData';

interface LeadDetailsPanelProps {
  lead: Lead | null;
  onClose: () => void;
}

export function LeadDetailsPanel({ lead, onClose }: LeadDetailsPanelProps) {
  if (!lead) return null;

  const agent = agents.find(a => a.id === lead.assignedTo);
  const activities = mockActivities.filter(a => a.leadId === lead.id);
  const currentStage = pipelineStages.find(s => s.id === lead.stage);

  const getScoreIcon = () => {
    switch (lead.score) {
      case 'hot':
        return <Flame className="h-4 w-4" />;
      case 'warm':
        return <Thermometer className="h-4 w-4" />;
      case 'cold':
        return <Snowflake className="h-4 w-4" />;
    }
  };

  const getScoreColor = () => {
    switch (lead.score) {
      case 'hot':
        return 'bg-score-hot text-white';
      case 'warm':
        return 'bg-score-warm text-white';
      case 'cold':
        return 'bg-score-cold text-white';
    }
  };

  const getScoreGradient = () => {
    switch (lead.score) {
      case 'hot':
        return 'gradient-hot';
      case 'warm':
        return 'gradient-warm';
      case 'cold':
        return 'gradient-cold';
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'visit':
        return <MapPin className="h-4 w-4" />;
      case 'note':
        return <FileText className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
    <Sheet open={!!lead} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-lg p-0 overflow-hidden">
        {/* Header with Score */}
        <div className={cn("p-6 text-white", getScoreGradient())}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getScoreIcon()}
                <span className="text-sm font-medium opacity-90 capitalize">{lead.score} Lead</span>
              </div>
              <h2 className="text-2xl font-bold">{lead.name}</h2>
              <p className="text-white/80 text-sm mt-1">{lead.course || 'Course not specified'}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{lead.scoreValue}</div>
              <div className="text-xs opacity-80">Score</div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-6">
            <Button className="flex-1 gap-2" size="sm">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" className="flex-1 gap-2" size="sm">
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button variant="outline" className="flex-1 gap-2" size="sm">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>

          {/* Stage Progress */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("w-3 h-3 rounded-full", stageColorMap[currentStage?.color || ''])} />
              <span className="text-sm font-medium">{currentStage?.label}</span>
            </div>
            <div className="flex gap-1">
              {pipelineStages.slice(0, -1).map((stage, index) => (
                <div
                  key={stage.id}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    index < (currentStage?.order || 0) 
                      ? stageColorMap[stage.color]
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 space-y-4">
              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.phone}</span>
                  </div>
                  {lead.email && (
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{lead.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Lead Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Lead Information</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Source</p>
                    <p className="text-sm font-medium">{lead.source}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm font-medium">{lead.budget ? `৳${lead.budget.toLocaleString()}` : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Decision Maker</p>
                    <p className="text-sm font-medium">{lead.isDecisionMaker ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Urgency</p>
                    <Badge variant="outline" className={cn(
                      "capitalize",
                      lead.urgency === 'high' && "border-score-hot text-score-hot",
                      lead.urgency === 'medium' && "border-score-warm text-score-warm",
                      lead.urgency === 'low' && "border-muted-foreground"
                    )}>
                      {lead.urgency}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Assigned Agent */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assigned To</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {agent ? getInitials(agent.name) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{agent?.name || 'Unassigned'}</p>
                    <p className="text-xs text-muted-foreground">{agent?.branch}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Follow-up */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Follow-up</h4>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-score-warm/10 border border-score-warm/20">
                  <Calendar className="h-5 w-5 text-score-warm" />
                  <div>
                    <p className="text-sm font-medium">Next Follow-up</p>
                    <p className="text-xs text-muted-foreground">{formatDate(lead.nextFollowUp)}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium capitalize">{activity.type}</span>
                          {activity.duration && (
                            <span className="text-xs text-muted-foreground">
                              ({formatDuration(activity.duration)})
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No activities recorded yet
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="space-y-4">
                {lead.notes ? (
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-sm">{lead.notes}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No notes added yet
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

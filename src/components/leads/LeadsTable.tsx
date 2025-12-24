import { useState } from 'react';
import { Lead } from '@/types/crm';
import { agents, pipelineStages } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface LeadsTableProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

type SortField = 'name' | 'createdAt' | 'scoreValue' | 'stage';
type SortDirection = 'asc' | 'desc';

export function LeadsTable({ leads, onLeadClick }: LeadsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const getAgentName = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'Unassigned';
  };

  const getStageBadge = (stage: string) => {
    const stageConfig = pipelineStages.find(s => s.id === stage);
    return stageConfig?.label || stage;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredLeads = leads
    .filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        (lead.email?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
      const matchesScore = scoreFilter === 'all' || lead.score === scoreFilter;

      return matchesSearch && matchesStage && matchesScore;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'scoreValue':
          comparison = a.scoreValue - b.scoreValue;
          break;
        case 'stage':
          const aOrder = pipelineStages.find(s => s.id === a.stage)?.order || 0;
          const bOrder = pipelineStages.find(s => s.id === b.stage)?.order || 0;
          comparison = aOrder - bOrder;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1" /> : 
      <ChevronDown className="w-4 h-4 ml-1" />;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {pipelineStages.map(stage => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredLeads.length} of {leads.length} leads
      </p>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Lead <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('stage')}
              >
                <div className="flex items-center">
                  Stage <SortIcon field="stage" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('scoreValue')}
              >
                <div className="flex items-center">
                  Score <SortIcon field="scoreValue" />
                </div>
              </TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center">
                  Created <SortIcon field="createdAt" />
                </div>
              </TableHead>
              <TableHead>Next Follow-up</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => onLeadClick(lead)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.source}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${lead.phone}`);
                      }}
                    >
                      <Phone className="w-4 h-4 text-primary" />
                    </Button>
                    {lead.email && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`mailto:${lead.email}`);
                        }}
                      >
                        <Mail className="w-4 h-4 text-primary" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {getStageBadge(lead.stage)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={lead.score as 'hot' | 'warm' | 'cold'}
                    className="text-xs"
                  >
                    {lead.score.toUpperCase()} ({lead.scoreValue})
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{lead.course || '-'}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {getAgentName(lead.assignedTo)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                  </span>
                </TableCell>
                <TableCell>
                  {lead.nextFollowUp ? (
                    <div className={cn(
                      "flex items-center gap-1.5 text-sm",
                      new Date(lead.nextFollowUp) < new Date() 
                        ? "text-destructive" 
                        : "text-muted-foreground"
                    )}>
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(lead.nextFollowUp), 'MMM d')}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

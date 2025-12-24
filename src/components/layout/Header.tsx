import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onAddLead?: () => void;
}

export function Header({ title, subtitle, onAddLead }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads, agents..." 
            className="pl-10 h-9 bg-background"
          />
        </div>

        {/* Add Lead Button */}
        {onAddLead && (
          <Button onClick={onAddLead} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-destructive"
          >
            5
          </Badge>
        </Button>
      </div>
    </header>
  );
}

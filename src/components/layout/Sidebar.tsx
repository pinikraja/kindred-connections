import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut,
  Phone,
  Calendar,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser } from '@/data/mockData';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pipeline', label: 'Pipeline', icon: Kanban },
  { id: 'leads', label: 'All Leads', icon: Users },
  { id: 'follow-ups', label: 'Follow-ups', icon: Calendar },
  { id: 'calls', label: 'Call Queue', icon: Phone },
  { id: 'targets', label: 'Targets', icon: Target },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadge = (role: string) => {
    const badges: Record<string, string> = {
      super_admin: 'Super Admin',
      manager: 'Manager',
      agent: 'Agent',
      auditor: 'Auditor',
    };
    return badges[role] || role;
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar flex flex-col transition-all duration-300 ease-in-out relative",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
            <span className="text-sidebar-primary-foreground font-bold text-lg">TC</span>
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sidebar-foreground font-bold text-lg leading-tight">Training</h1>
              <p className="text-sidebar-foreground/60 text-xs">Center CRM</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent group",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 shrink-0 transition-transform duration-200",
                isActive && "scale-110"
              )} />
              {!collapsed && (
                <span className="text-sm font-medium animate-fade-in">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}

        {/* User Profile */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-lg bg-sidebar-accent/50 mt-3",
          collapsed && "justify-center"
        )}>
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                {getRoleBadge(currentUser.role)}
              </p>
            </div>
          )}
          {!collapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-20 w-6 h-6 rounded-full",
          "bg-card border border-border shadow-card",
          "flex items-center justify-center",
          "text-muted-foreground hover:text-foreground hover:shadow-card-hover",
          "transition-all duration-200"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
}

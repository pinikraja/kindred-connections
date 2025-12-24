import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PipelineBoard } from '@/components/pipeline/PipelineBoard';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { AgentPerformanceCard } from '@/components/dashboard/AgentPerformanceCard';
import { LeadDetailsPanel } from '@/components/leads/LeadDetailsPanel';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { FollowUpsList } from '@/components/followups/FollowUpsList';
import { CallQueue } from '@/components/calls/CallQueue';
import { TargetsPage } from '@/components/targets/TargetsPage';
import { AnalyticsPage } from '@/components/analytics/AnalyticsPage';
import { SettingsPage } from '@/components/settings/SettingsPage';
import { dashboardStats, mockLeads } from '@/data/mockData';
import { Lead } from '@/types/crm';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your overview.' };
      case 'pipeline':
        return { title: 'Sales Pipeline', subtitle: 'Manage your leads through the funnel.' };
      case 'leads':
        return { title: 'All Leads', subtitle: 'View and manage all leads.' };
      case 'follow-ups':
        return { title: 'Follow-ups', subtitle: 'Your scheduled follow-ups.' };
      case 'calls':
        return { title: 'Call Queue', subtitle: 'Leads waiting for calls.' };
      case 'targets':
        return { title: 'Targets', subtitle: 'Track your goals and progress.' };
      case 'analytics':
        return { title: 'Analytics', subtitle: 'Deep dive into your data.' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Configure your preferences.' };
      default:
        return { title: 'Dashboard', subtitle: '' };
    }
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const pageInfo = getPageTitle();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={pageInfo.title} 
          subtitle={pageInfo.subtitle}
          onAddLead={() => {}}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <DashboardStats stats={dashboardStats} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PipelineBoard 
                    leads={mockLeads} 
                    onLeadClick={handleLeadClick}
                  />
                </div>
                <div className="space-y-6">
                  <AgentPerformanceCard />
                  <RecentActivities />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="animate-fade-in">
              <PipelineBoard 
                leads={mockLeads} 
                onLeadClick={handleLeadClick}
              />
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="animate-fade-in">
              <LeadsTable leads={mockLeads} onLeadClick={handleLeadClick} />
            </div>
          )}

          {activeTab === 'follow-ups' && (
            <div className="animate-fade-in">
              <FollowUpsList leads={mockLeads} onLeadClick={handleLeadClick} />
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="animate-fade-in">
              <CallQueue leads={mockLeads} onLeadClick={handleLeadClick} />
            </div>
          )}

          {activeTab === 'targets' && (
            <div className="animate-fade-in">
              <TargetsPage />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-fade-in">
              <AnalyticsPage />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in">
              <SettingsPage />
            </div>
          )}
        </main>
      </div>

      <LeadDetailsPanel 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
      
      <Toaster />
    </div>
  );
};

export default Index;

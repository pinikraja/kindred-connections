import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

const leadsTrend = [
  { name: 'Week 1', leads: 32, conversions: 8 },
  { name: 'Week 2', leads: 45, conversions: 12 },
  { name: 'Week 3', leads: 38, conversions: 10 },
  { name: 'Week 4', leads: 41, conversions: 14 },
];

const sourceData = [
  { name: 'Facebook', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'Website', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Referral', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Google', value: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Walk-in', value: 5, color: 'hsl(var(--chart-5))' },
];

const courseData = [
  { name: 'Mobile Servicing', admissions: 42, revenue: 630000 },
  { name: 'Laptop Repair', admissions: 28, revenue: 392000 },
  { name: 'Computer Basics', admissions: 18, revenue: 180000 },
  { name: 'Networking', admissions: 12, revenue: 156000 },
];

const dailyActivity = [
  { day: 'Mon', calls: 45, whatsapp: 32, visits: 5 },
  { day: 'Tue', calls: 52, whatsapp: 28, visits: 8 },
  { day: 'Wed', calls: 38, whatsapp: 35, visits: 3 },
  { day: 'Thu', calls: 48, whatsapp: 30, visits: 6 },
  { day: 'Fri', calls: 55, whatsapp: 42, visits: 10 },
  { day: 'Sat', calls: 62, whatsapp: 48, visits: 12 },
  { day: 'Sun', calls: 25, whatsapp: 18, visits: 2 },
];

const funnelData = [
  { stage: 'New', count: 156, percentage: 100 },
  { stage: 'Contacted', count: 120, percentage: 77 },
  { stage: 'Interested', count: 68, percentage: 44 },
  { stage: 'Visit', count: 42, percentage: 27 },
  { stage: 'Payment', count: 28, percentage: 18 },
  { stage: 'Admission', count: 18, percentage: 12 },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-success text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">32.5%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-success text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+5% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">৳288K</p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-success text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+18% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">18</p>
                <p className="text-sm text-muted-foreground">Admissions</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
              <span>Target: 25</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Leads & Conversions Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={leadsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.2)" 
                  name="Leads"
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success) / 0.2)" 
                  name="Conversions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Lead Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {sourceData.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm text-foreground">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Course Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={courseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="admissions" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Admissions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnelData.map((stage, index) => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{stage.stage}</span>
                    <span className="text-muted-foreground">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="h-8 bg-muted/30 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage > 20 && (
                        <span className="text-xs text-primary-foreground font-medium">
                          {stage.count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Weekly Activity Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Calls" />
              <Bar dataKey="whatsapp" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} name="WhatsApp" />
              <Bar dataKey="visits" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} name="Visits" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

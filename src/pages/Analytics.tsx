import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChartBarIcon, 
  ArrowDownTrayIcon,
  CalendarIcon
} from "@heroicons/react/24/outline";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock analytics data
const moderationTrends = [
  { date: '2024-01-08', processed: 1200, flagged: 45, approved: 38, rejected: 7 },
  { date: '2024-01-09', processed: 1350, flagged: 52, approved: 44, rejected: 8 },
  { date: '2024-01-10', processed: 1180, flagged: 38, approved: 31, rejected: 7 },
  { date: '2024-01-11', processed: 1420, flagged: 58, approved: 49, rejected: 9 },
  { date: '2024-01-12', processed: 1290, flagged: 41, approved: 35, rejected: 6 },
  { date: '2024-01-13', processed: 1380, flagged: 47, approved: 40, rejected: 7 },
  { date: '2024-01-14', processed: 1247, flagged: 35, approved: 28, rejected: 7 }
];

const categoryData = [
  { name: 'Harmful Language', value: 45, color: '#ef4444' },
  { name: 'Spam Content', value: 28, color: '#f59e0b' },
  { name: 'Inappropriate Content', value: 22, color: '#8b5cf6' },
  { name: 'False Information', value: 15, color: '#ec4899' },
  { name: 'Other', value: 12, color: '#6b7280' }
];

const accuracyData = [
  { date: '2024-01-08', accuracy: 92.1 },
  { date: '2024-01-09', accuracy: 93.4 },
  { date: '2024-01-10', accuracy: 94.2 },
  { date: '2024-01-11', accuracy: 93.8 },
  { date: '2024-01-12', accuracy: 94.5 },
  { date: '2024-01-13', accuracy: 94.1 },
  { date: '2024-01-14', accuracy: 94.2 }
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights into your content moderation performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Last 7 Days
            </Button>
            <Button variant="hero">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Processed</p>
                <p className="text-3xl font-bold text-card-foreground">9,067</p>
                <p className="text-sm text-success mt-1">+8.2% vs last week</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-primary shadow-primary">
                <ChartBarIcon className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Content</p>
                <p className="text-3xl font-bold text-card-foreground">316</p>
                <p className="text-sm text-destructive mt-1">-12.4% vs last week</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-warning shadow-warning">
                <ChartBarIcon className="h-6 w-6 text-warning-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-3xl font-bold text-card-foreground">94.2%</p>
                <p className="text-sm text-success mt-1">+1.8% vs last week</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-success shadow-success">
                <ChartBarIcon className="h-6 w-6 text-success-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">False Positives</p>
                <p className="text-3xl font-bold text-card-foreground">18</p>
                <p className="text-sm text-success mt-1">-25.0% vs last week</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-card shadow-primary">
                <ChartBarIcon className="h-6 w-6 text-card-foreground" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Moderation Trends */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Daily Moderation Activity
              </h3>
              <Badge variant="default">Last 7 Days</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moderationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="processed" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Processed"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="flagged" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Flagged"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Accuracy Trend */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Accuracy Trend
              </h3>
              <Badge variant="success">94.2% Current</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    tick={{ fill: '#9ca3af' }}
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Accuracy %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Category Breakdown and Action Summary */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Flagged Content Categories
              </h3>
              <Badge variant="warning">316 Total</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Action Summary */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">
                Moderator Actions
              </h3>
              <Badge variant="default">This Week</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moderationTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Summary Table */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">
              Performance Summary
            </h3>
            <Button variant="outline" size="sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground">Metric</th>
                  <th className="text-left p-3 text-muted-foreground">Today</th>
                  <th className="text-left p-3 text-muted-foreground">Yesterday</th>
                  <th className="text-left p-3 text-muted-foreground">7 Days Avg</th>
                  <th className="text-left p-3 text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-3 text-card-foreground font-medium">Content Processed</td>
                  <td className="p-3 text-card-foreground">1,247</td>
                  <td className="p-3 text-muted-foreground">1,380</td>
                  <td className="p-3 text-muted-foreground">1,291</td>
                  <td className="p-3"><Badge variant="destructive">-9.6%</Badge></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-3 text-card-foreground font-medium">Flagged Items</td>
                  <td className="p-3 text-card-foreground">35</td>
                  <td className="p-3 text-muted-foreground">47</td>
                  <td className="p-3 text-muted-foreground">45</td>
                  <td className="p-3"><Badge variant="success">-25.5%</Badge></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-3 text-card-foreground font-medium">Accuracy Rate</td>
                  <td className="p-3 text-card-foreground">94.2%</td>
                  <td className="p-3 text-muted-foreground">94.1%</td>
                  <td className="p-3 text-muted-foreground">93.7%</td>
                  <td className="p-3"><Badge variant="success">+0.5%</Badge></td>
                </tr>
                <tr>
                  <td className="p-3 text-card-foreground font-medium">Response Time</td>
                  <td className="p-3 text-card-foreground">142ms</td>
                  <td className="p-3 text-muted-foreground">158ms</td>
                  <td className="p-3 text-muted-foreground">165ms</td>
                  <td className="p-3"><Badge variant="success">-10.1%</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

// Mock data
const stats = [
  {
    title: "Content Processed Today",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    icon: CheckCircleIcon,
    color: "success"
  },
  {
    title: "Flagged Content",
    value: "23",
    change: "-8.2%",
    trend: "down",
    icon: ExclamationTriangleIcon,
    color: "warning"
  },
  {
    title: "Accuracy Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: ArrowTrendingUpIcon,
    color: "success"
  },
  {
    title: "Pending Reviews",
    value: "7",
    change: "0%",
    trend: "stable",
    icon: ClockIcon,
    color: "default"
  }
];

const recentActivity = [
  {
    id: 1,
    content: "Message containing harmful language detected in chat room #general",
    severity: "high",
    time: "2 minutes ago",
    status: "flagged"
  },
  {
    id: 2,
    content: "Potential spam content detected in forum post",
    severity: "medium",
    time: "15 minutes ago",
    status: "review"
  },
  {
    id: 3,
    content: "Safe content approved automatically",
    severity: "low",
    time: "23 minutes ago",
    status: "approved"
  },
  {
    id: 4,
    content: "Slang dictionary updated with 3 new terms",
    severity: "info",
    time: "1 hour ago",
    status: "updated"
  }
];

const Dashboard = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'flagged': return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'approved': return <CheckCircleIcon className="h-4 w-4" />;
      case 'review': return <EyeIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your content moderation system in real-time
            </p>
          </div>
          <Button variant="hero">
            View Live Feed
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-border hover:shadow-primary transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-success" />
                    ) : stat.trend === 'down' ? (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-destructive" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span className={`text-sm ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : 
                      'text-muted-foreground'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-${stat.color} shadow-${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">Recent Activity</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                <div className={`p-2 rounded-lg bg-gradient-${getSeverityColor(activity.severity)} shadow-${getSeverityColor(activity.severity)}`}>
                  {getStatusIcon(activity.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">
                    {activity.content}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant={getSeverityColor(activity.severity)} className="text-xs">
                      {activity.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ExclamationTriangleIcon className="h-4 w-4 mr-3" />
                Review Flagged Content (7 pending)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-3" />
                Generate Analytics Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircleIcon className="h-4 w-4 mr-3" />
                Update Moderation Rules
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI Model Status</span>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Processing Queue</span>
                <Badge variant="default">3 items</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database Status</span>
                <Badge variant="success">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Response Time</span>
                <Badge variant="success">142ms</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;